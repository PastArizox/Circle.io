import { resolve } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "development",
    entry: "./src/client/index.js",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
};
