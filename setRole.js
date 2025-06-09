import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

admin.initializeApp({
    credential: admin.credential.cert(
        require("./bellybloom-f895a-firebase-adminsdk-fbsvc-65c6b9fda5.json")
    ),
});

const uid = "aNarmMOXVubBVWrSUDBiYBXHAEF3"; // ganti dengan UID user
admin
    .auth()
    .setCustomUserClaims(uid, { role: "admin" })
    .then(() => {
        console.log("Custom claim set!");
    });
