import invariant from "tiny-invariant";

export function getENV() {
    invariant(process.env.GOOGLE_CLIENT_ID, "GOOGLE_CLIENT_ID should be defined");
    invariant(process.env.GOOGLE_CLIENT_SECRET, "GOOGLE_CLIENT_SECRET should be defined");

    return {
        GOOGLE_CLIENT_ID:"142615838089-dkbj31e314u834mvrn66ununko9dkb5m.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET:"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"
    }
}

type ENV = ReturnType<typeof getENV>

declare global {
    var ENV: ENV;
    interface Window {
        ENV: ENV
    }
}