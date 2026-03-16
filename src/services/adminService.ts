import axios from "axios";
import type {
    AuditLog,
    GetUsersParams,
    LanguageStat,
    PaginatedResponse,
    SystemHealth,
} from "../types/admin.types";
import type { AdminUserDto } from "../components/admin/user-management/types";

const baseURL = import.meta.env.VITE_API_URL;

const adminClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

adminClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getSystemHealth = async (): Promise<SystemHealth> => {
    const { data } = await adminClient.get<SystemHealth>("/api/admin/system/health");
    return data;
};

export const getLanguageStats = async (): Promise<LanguageStat[]> => {
    const { data } = await adminClient.get<LanguageStat[]>("/api/admin/analytics/languages");
    return data;
};

export const getUsers = async (
    params: GetUsersParams = {}
): Promise<PaginatedResponse<AdminUserDto>> => {
    const { data } = await adminClient.get<PaginatedResponse<AdminUserDto>>(
        "/api/admin/users",
        {
            params,
        }
    );
    return data;
};

export const toggleUserBanStatus = async (
    userId: string,
    shouldBan: boolean
): Promise<void> => {
    if (shouldBan) {
        await adminClient.patch(`/api/admin/users/${userId}/ban`);
        return;
    }

    await adminClient.patch(`/api/admin/users/${userId}/unban`);
};

export const deleteUserProject = async (
    userId: string,
    projectId: string
): Promise<void> => {
    await adminClient.delete(`/api/admin/users/${userId}/projects/${projectId}`);
};

export const getAuditLogs = async (): Promise<AuditLog[]> => {
    const { data } = await adminClient.get<AuditLog[]>("/api/admin/audit-logs");
    return data;
};
