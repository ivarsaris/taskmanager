import { Injectable } from "@angular/core";
import { Department } from "./department.model";
import { department_list } from "./departments.list";

@Injectable({providedIn: 'root'})

export class DepartmentsService {
    department_list = department_list;

    constructor() {
        const departments = localStorage.getItem('taskmanager_departments');

        if (departments) {
            this.department_list = JSON.parse(departments);
        }
    }

    createNewDepartment(name: string) {
        const departmentId = Math.max(...this.department_list.map(department => department.id)) + 1;
        
        const newDepartment: Department = {
            id: departmentId,
            name: name
        };
        this.department_list.push(newDepartment);

        this.saveDepartmentsToLocalStorage();
    }

    saveDepartmentsToLocalStorage() {
        console.log(1);
        localStorage.setItem('taskmanager_departments', JSON.stringify(this.department_list));
        console.log(localStorage.getItem('taskmanager_departments'));
    }
}