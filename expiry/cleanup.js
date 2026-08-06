const admin = require("firebase-admin");

// GitHub Secrets থেকে ডাটা নিয়ে ফায়ারবেসে কানেক্ট করা
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // প্রাইভেট কীর ভেতরের নতুন লাইনগুলো সঠিকভাবে রিড করার জন্য
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

async function runCleanup() {
    const now = Date.now();
    console.log("Starting cleanup check at:", new Date(now).toISOString());

    try {
        // ১. Devices চেক করা এবং মেয়াদ শেষ হলে রিমুভ করা
        const devicesRef = db.ref("devices");
        const devicesSnap = await devicesRef.once("value");

        if (devicesSnap.exists()) {
            devicesSnap.forEach(async (child) => {
                const deviceId = child.key;
                const data = child.val();

                if (data.expireAt && now > data.expireAt) {
                    if (data.subKey) {
                        await db.ref("subscriptions/" + data.subKey).remove();
                    }
                    await devicesRef.child(deviceId).remove();
                    console.log(`Deleted expired device: ${deviceId}`);
                }
            });
        }

        // ২. Subscriptions চেক করা এবং মেয়াদ শেষ হলে রিমুভ করা
        const subsRef = db.ref("subscriptions");
        const subsSnap = await subsRef.once("value");

        if (subsSnap.exists()) {
            subsSnap.forEach(async (child) => {
                const subId = child.key;
                const data = child.val();

                if (data.expireAt && now > data.expireAt) {
                    await subsRef.child(subId).remove();
                    console.log(`Deleted expired subscription: ${subId}`);
                }
            });
        }

        console.log("Cleanup finished successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error during cleanup:", error);
        process.exit(1);
    }
}

runCleanup();
