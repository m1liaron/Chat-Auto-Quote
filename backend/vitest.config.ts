/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        setupFiles: "./vitest.setup.ts",
        testTimeout: 20000,      
    },
});
