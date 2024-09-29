import { tasks_list } from "./tasks.list";
import { task_statuses } from "./task.parts.list";
import { task_priorities } from "./task.parts.list";
import { task_filter_components } from "./task.parts.list";
import { users_list } from "../users/users.list";
import { Injectable } from "@angular/core";
import { Task } from "./task.model";

@Injectable({ providedIn: 'root' })

export class TasksService {

    tasks_list = tasks_list;
    filtered_tasks_list = tasks_list;
    task_statuses = task_statuses;
    task_priorities = task_priorities;
    task_filter_components = task_filter_components;
    users_list = users_list;
    selectedUserName: string = '';

    /**
     * 
     * @param {string} status - the statuses the tasks can be in
     * @returns {Task[]} - array of tasks with the specified status
     */
    getTasksByStatus(status: string) {
        return [...this.filtered_tasks_list].filter(task => task.status === status);
    }

    /**
     * 
     * @param {number} id - id of a user 
     * @returns  {string} - name of the user matching the id
     */
    getUserById(id: number) {
        const user = this.users_list.find(user => user.id === id);
        return user?.name;
    }

    /**
     * 
     * runs when a filter or sorting method is selected. to return
     * the list of tasks sorted and filtered
     * 
     */
    filterAndSortTasks(id: number, sortValue: string) {
        this.filterTasksByUser(id);
        this.sortTasksByComponent(sortValue);
    }

    /**
     * filters the tasks_list by selected user
     */
    filterTasksByUser(id: number) {
        id = Number(id);
        this.selectedUserName = this.getUserById(Number(id)) || 'no user selected';
        console.log(this.selectedUserName);

        if (id === -1) {
            this.filtered_tasks_list = this.tasks_list;
        } else {
            this.filtered_tasks_list = this.tasks_list.filter(task => task.assignee_id === id);
        }
    }

    /**
     * sorts the tasks_list by chosen value
     */
    sortTasksByComponent(sortValue: string) {

        switch (sortValue) {
            case 'default':
                this.filtered_tasks_list = this.filtered_tasks_list;
                break;

            case 'priority':
                this.filtered_tasks_list = this.filtered_tasks_list.sort((task1: Task, task2: Task) => {
                    return task1.priority - task2.priority;
                });
                break;

            case 'date_created':
                this.sortByDate(sortValue);
                break;

            case 'date_deadline':
                this.sortByDate(sortValue);
                break;
        }
    }

    sortByDate(dateType: keyof Task) {
        this.filtered_tasks_list = this.filtered_tasks_list.sort((task1: Task, task2: Task) => {
            return new Date(task1[dateType]).getTime() - new Date(task2[dateType]).getTime();
        });
    }
}