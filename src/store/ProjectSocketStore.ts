import { create } from "zustand";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";

interface ProjectSocket {
    client: Client | null;
    project: ProjectDetailResponse | null;
    loading: boolean;
    isConnected: boolean; // ✅ Add connection state tracker

    connect: (token: string) => void;
    disconnect: () => void;
    getProject: (projectId: string) => void;
}

export const ProjectSocketStore = create<ProjectSocket>((set, get) => ({
    client: null,
    project: null,
    loading: true, // ✅ Default to true so UI doesn't flash before connect
    isConnected: false,

    connect: (token: string) => {
        // Prevent multiple connections
        if (get().client?.connected) return;

        const socket = new SockJS("http://localhost:8080/ws");

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),

            onConnect: () => {
                console.log("✅ Connected to WebSocket");
                set({ isConnected: true }); // ✅ Signal that we are ready
            },

            onStompError: (frame) => {
                console.log("❌ STOMP error:", frame);
                set({ loading: false, isConnected: false });
            },
            onDisconnect: () => {
                set({ isConnected: false });
            }
        });

        client.activate();
        set({ client });
    },

    disconnect: () => {
        const client = get().client;
        if (client) {
            client.deactivate();
            set({ client: null, isConnected: false, project: null });
        }
    },

    getProject: (projectId: string) => {
        const client = get().client;
        
        if (!client || !client.connected) {
            console.log("❌ WebSocket not connected");
            return;
        }

        // Subscribe to topic FIRST
        client.subscribe(`/topic/project/${projectId}`, (message) => {
            const data = JSON.parse(message.body);
            console.log("📦 Project received:", data);
            set({ project: data, loading: false });
        });

        // Then request project
        client.publish({
            destination: `/app/project/${projectId}`,
            body: "", 
        });
    },
}));