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
    empty: boolean
    number: number
    numberOfElements: number
    pageable: Pageable
    size: number
    sort: Sort2
}
export interface Pageable {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: Sort
    unpaged: boolean
}

export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export interface Sort2 {
    empty: boolean
    sorted: boolean
    unsorted: boolean
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
