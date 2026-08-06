const admin = require("firebase-admin");

// GitHub Secrets থেকে কনফিগারেশন লোড করা
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

async function runCleanup() {
    const now = Date.now();
    console.log("Starting cleanup check at:", new Date(now).toISOString());

    try {
        // ১. Devices চেক করে মেয়াদ শেষ হলে ডিলিট করা
        const devicesRef = db.ref("devices");
        const devicesSnap = await devicesRef.once("value");

        if (devicesSnap.exists()) {
            const updates = [];
            devicesSnap.forEach((child) => {
                const deviceId = child.key;
                const data = child.val();

                if (data.expireAt && now > data.expireAt) {
                    if (data.subKey) {
                        updates.push(db.ref("subscriptions/" + data.subKey).remove());
                    }
                    updates.push(devicesRef.child(deviceId).remove());
                    console.log(`Marked for deletion - Expired device: ${deviceId}`);
                }
            });
            await Promise.all(updates);
        }

        // ২. Subscriptions চেক করে মেয়াদ শেষ হলে ডিলিট করা
        const subsRef = db.ref("subscriptions");
        const subsSnap = await subsRef.once("value");

        if (subsSnap.exists()) {
            const subUpdates = [];
            subsSnap.forEach((child) => {
                const subId = child.key;
                const data = child.val();

                if (data.expireAt && now > data.expireAt) {
                    subUpdates.push(subsRef.child(subId).remove());
                    console.log(`Marked for deletion - Expired subscription: ${subId}`);
                }
            });
            await Promise.all(subUpdates);
        }

        console.log("Cleanup finished successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error during cleanup:", error);
        process.exit(1);
    }
}

runCleanup();
