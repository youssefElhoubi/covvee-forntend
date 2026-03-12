import { create } from 'zustand';
import { Client, type Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// 1. Define the exact shape of your store
interface WebSocketState {
    stompClient: Client | null;
    isConnected: boolean;
    connect: (userToken: string) => void;
    disconnect: () => void;
}

// 2. Pass the interface into the Zustand create function
const useWebSocketStore = create<WebSocketState>((set, get) => ({
    // Initial State
    stompClient: null,
    isConnected: false,

    // Actions
    connect: (userToken: string) => {
        // get().stompClient is now strictly typed as Client | null
        const currentClient = get().stompClient;
        
        if (currentClient || !userToken) {
            console.warn("WebSocket is already connected or token is missing.");
            return;
        }

        console.log("Initializing Covvee WebSocket Connection via Zustand...");

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            
            connectHeaders: {
                Authorization: `Bearer ${userToken}`
            },
            
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,

            // frame is strictly typed to the STOMP Frame object
            onConnect: () => {
                console.log('Successfully connected to STOMP broker.');
                set({ isConnected: true }); 
            },
            
            onDisconnect: () => {
                console.log('Disconnected from STOMP broker.');
                set({ isConnected: false, stompClient: null });
            },

            onStompError: (frame: Frame) => {
                console.error('STOMP Error:', frame.headers['message']);
            }
        });

        client.activate();
        
        set({ stompClient: client });
    },

    disconnect: () => {
        const { stompClient } = get();
        if (stompClient) {
            stompClient.deactivate();
            set({ stompClient: null, isConnected: false });
        }
    }
}));

export default useWebSocketStore;