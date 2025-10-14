declare module "socket.io" {
    interface Socket {
        user?: {
            userId: string;
            firstName: string;
            lastName: string;
        };
    }
}