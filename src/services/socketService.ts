import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost";
const API_PORT = import.meta.env.VITE_API_PORT || "4000";
const SOCKET_URL = `${API_URL}:${API_PORT}`;

class SocketService {
  private socket: Socket | null = null;
  private initialized = false;

  initialize() {
    if (this.initialized) return;

    this.socket = io(SOCKET_URL);
    this.setupEventListeners();
    this.initialized = true;
    console.log("Socket.IO initialized");
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    this.socket.on("notification", (data) => {
      console.log("Notification received", data);
    });

    this.socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });
  }

  joinQueue(queueId: string) {
    if (!this.socket) return;
    this.socket.emit("joinGroup", `queue:${queueId}`);

    this.socket.on("notification", (message) => {
      console.log("Received notification:", message);
    });
  }

  leaveQueue(queueId: string) {
    if (!this.socket) return;
    this.socket.emit("leaveGroup", `queue:${queueId}`);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.initialized = false;
      console.log("Socket.IO disconnected");
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
