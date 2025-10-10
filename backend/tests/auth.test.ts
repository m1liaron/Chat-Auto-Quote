import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Auth Controller", () => {
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
        const res = await request(app).post("/auth/register").send({
            firstName: "John",
            lastName: "Doe",
            email: "john@example.com",
            password: "123456",
        });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("error", true);
        expect(res.body.message).toContain("User with email: john@example.com, already exist");
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
