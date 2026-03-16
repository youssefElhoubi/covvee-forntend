export interface SystemHealth {
    status: string;
    totalDiskSpaceBytes: number;
    freeDiskSpaceBytes: number;
    usedSpacePercentage: number;
}

export interface LanguageStat {
    language: string;
    count: number;
}

export interface ProjectSummary {
    id: string;
    name: string;
    language: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    isBanned: boolean;
    createdAt: string;
    projectCount: number;
    projects: ProjectSummary[];
}

export interface PaginatedResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
}

export interface AuditLog {
    id: string;
    adminId: string;
    adminUsername: string;
    action: string;
    targetId: string;
    details: string;
    timestamp: string;
}

export interface GetUsersParams {
    page?: number;
    size?: number;
    search?: string;
}
