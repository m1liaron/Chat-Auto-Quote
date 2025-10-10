import { beforeAll, afterAll, afterEach } from "vitest";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./tests/setup.test";

beforeAll(async () => {
    await connectTestDB();
});

afterEach(async () => {
    await clearTestDB();
});

afterAll(async () => {
    await disconnectTestDB();
});
