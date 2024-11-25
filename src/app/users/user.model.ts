export interface User {
    id: number;
    name: string;
    avatar: string;
    department?: number;
    position?: string;
    email?: string;
    role?:string;
    status: string;
}