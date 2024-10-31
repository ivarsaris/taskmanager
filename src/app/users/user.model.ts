export interface User {
    id: number;
    name: string;
    avatar: string;
    department?: string;
    position?: string;
    email?: string;
    status: string;
}