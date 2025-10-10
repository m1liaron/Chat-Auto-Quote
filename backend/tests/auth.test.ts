import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../src/index";
import { User } from "../src/models/User.model";
import { EnvVariables } from "../src/common/enums";

const TEST_DB_URI = EnvVariables.MONGO_URI;

describe("Auth Controller", () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_DB_URI);
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/auth/register")
            .send({
                firstName: "John",
                lastName: "Doe",
                email: "john@example.com",
                password: "123456",
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("user");
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.email).toBe("john@example.com");
    });

    it("should not register with missing fields", async () => {
        const res = await request(app).post("/auth/register").send({
            firstName: "Jane",
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing fields");
    });

    it("should not register duplicate email", async () => {
        // first registration already happened in previous test
        const res = await request(app).post("/auth/register").send({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "123456",
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", true);
        expect(res.body.message).toContain("already exist");
    });

    it("should login existing user", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "john@example.com",
            password: "123456",
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("token");
        expect(res.body.user.email).toBe("john@example.com");
    });

    it("should not login with missing fields", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "john@example.com",
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Missing fields");
    });

    it("should not login with non-existing user", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "nonexistent@example.com",
            password: "123456",
        });

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("not exist");
    });
});
