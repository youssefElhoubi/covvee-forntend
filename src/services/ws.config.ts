import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client|null = null;

export const connectWebSocket = (onMessageReceived: any) => {
    const socket = new SockJS("http://localhost:8080/ws");
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
            console.log("Connected to WebSocket");
            // Subscribe to topic
            stompClient?.subscribe("/topic/messages", (message: any) => {
                const body = JSON.parse(message.body);
                onMessageReceived(body);
            });
        },
    });
    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};
