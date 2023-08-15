export default function println(...args) {
    if (process.env.NODE_ENV === "development") {
        console.log("[+] DEBUG ", ...args);
    }
}