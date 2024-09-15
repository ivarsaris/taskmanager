export interface Task {
    id: number;
    assignee: number;
    title: string;
    description: string;
    date_created: string;
    date_deadline: string;
    priority: number;
    status: string;
}