import { create } from "zustand";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { ProjectDetailResponse } from "../types/ProjectDetailResponse";

interface ProjectSocket {
    client: Client | null;
    project: ProjectDetailResponse|null;

    connectSocket: (token: string) => void;
    disconnectSocket: () => void;
    getProject: (projectId: string) => void;
}

export const ProjectSocketStore = create<ProjectSocket>((set, get) => ({
    client: null,
    project: null,

    connectSocket: (token: string) => {
        const socket = new SockJS("http://localhost:8080/ws");

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),

            onConnect: () => {
                console.log("✅ Connected to WebSocket");
            },

            onStompError: (frame) => {
                console.error("❌ STOMP error:", frame);
            },
        });

        client.activate();

        set({ client });
    },

    disconnectSocket: () => {
        const client = get().client;
        if (client) {
            client.deactivate();
            set({ client: null });
        }
    },

    getProject: (projectId: string) => {
        const client = get().client;

        if (!client || !client.connected) {
            console.error("❌ WebSocket not connected");
            return;
        }

        // ✅ Subscribe to topic FIRST
        client.subscribe(`/topic/project/${projectId}`, (message) => {
            const data = JSON.parse(message.body);
            console.log("📦 Project received:", data);

            set({ project: data });
        });

        // ✅ Then request project
        client.publish({
            destination: `/app/project/${projectId}`,
            body: "", // can be empty
        });
    },
}));