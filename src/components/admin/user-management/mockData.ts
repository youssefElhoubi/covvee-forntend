import type { PaginatedUsersDto } from "./types";

export const PAGE_SIZE = 2;

export const mockUsersPage: PaginatedUsersDto = {
    content: [
        {
            id: "123",
            username: "youssef",
            email: "test@test.com",
            role: "USER",
            isBanned: false,
            projectCount: 2,
            joinedDate: "2026-01-22",
            projects: [
                { id: "p1", name: "My App", language: "JAVA" },
                { id: "p2", name: "Data Crunch", language: "PYTHON" },
            ],
        },
        {
            id: "124",
            username: "amina",
            email: "amina@covvee.dev",
            role: "USER",
            isBanned: true,
            projectCount: 1,
            joinedDate: "2026-02-03",
            projects: [{ id: "p3", name: "Realtime Board", language: "JAVASCRIPT" }],
        },
        {
            id: "125",
            username: "mohamed",
            email: "mohamed@covvee.dev",
            role: "ADMIN",
            isBanned: false,
            projectCount: 3,
            joinedDate: "2025-12-10",
            projects: [
                { id: "p4", name: "Compiler Core", language: "GO" },
                { id: "p5", name: "CLI Tools", language: "RUST" },
                { id: "p6", name: "Playground", language: "TYPESCRIPT" },
            ],
        },
    ],
    totalPages: 5,
};
