export interface UserProjectDto {
    id: string;
    name: string;
    language: string;
}

export interface AdminUserDto {
    id: string;
    username: string;
    email: string;
    role: "USER" | "ADMIN";
    isBanned: boolean;
    projectCount: number;
    projects: UserProjectDto[];
    joinedDate: string;
}

export interface PaginatedUsersDto {
    content: AdminUserDto[];
    totalPages: number;
}
