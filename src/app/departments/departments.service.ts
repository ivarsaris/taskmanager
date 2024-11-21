import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Department } from "./department.model";
import { department_list } from "./departments.list";

@Injectable({providedIn: 'root'})

export class DepartmentsService {
    department_list = department_list;

    private departmentListSubject = new BehaviorSubject<Department[]>(department_list);
    departmentList$ = this.departmentListSubject.asObservable();

    constructor() {
        const departments = localStorage.getItem('taskmanager_departments');

        if (departments) {
            this.departmentListSubject.next(JSON.parse(departments));
        }
    }

    createNewDepartment(name: string) {
        const departmentId = Math.max(...this.departmentListSubject.value.map(department => department.id)) + 1;
        
        const newDepartment: Department = {
            id: departmentId,
            name: name
        };

        const updatedDepartmentList = [...this.departmentListSubject.value, newDepartment];
        this.departmentListSubject.next(updatedDepartmentList);

        this.saveDepartmentsToLocalStorage(updatedDepartmentList);
    }

    saveDepartmentsToLocalStorage(departmentList: Department[]) {
        localStorage.setItem('taskmanager_departments', JSON.stringify(departmentList));
    }
}