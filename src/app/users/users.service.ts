import { Injectable } from "@angular/core";
import { map, Subscription } from "rxjs";
import { sharedDataService } from "../sharedData.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";
import { users_list } from "./users.list";
import { Department } from "../departments/department.model";

@Injectable({ providedIn: 'root' })

export class UsersService {

    private currentUserToEditSubject = new BehaviorSubject<User | undefined>(undefined);
    currentUserToEdit$ = this.currentUserToEditSubject.asObservable();

    private currentUserToViewSubject = new BehaviorSubject<User | undefined>(undefined);
    currentUserToView$ = this.currentUserToViewSubject.asObservable();

    private usersListSubject = new BehaviorSubject<User[]>(users_list);
    usersList$ = this.usersListSubject.asObservable();

    private currentUserToViewDepartmentSubject = new BehaviorSubject<Department | undefined>(undefined);
    currentUserToViewDepartment$ = this.currentUserToViewDepartmentSubject.asObservable();

    departmentList$: Observable<Department[]>;

    constructor(private sharedDataService: sharedDataService) {
        const users = localStorage.getItem('taskmanager_users');

        if (users) {
            this.usersListSubject.next(JSON.parse(users));
        }

        this.departmentList$ = this.sharedDataService.departmentList$;
    }

    /**
     * @param user - user to be added to the users list
     */
    createNewUser(user: User) {
        const currentUsersList = this.usersListSubject.value;
        const updatedUsersList = [...currentUsersList, user];
        this.usersListSubject.next(updatedUsersList);
        this.saveUsers(updatedUsersList);
    }

    /**
     * 
     * @param id - id of the user
     * @returns user who matches the id from the users list
     */
    getUserById(id: number) {
        const user = this.usersListSubject.value.find(user => user.id === id);
        return user;
    }

    /**
     * 
     * @param id - id of the user
     * 
     * sets the user to edit in the modal
     */
    setUserToEdit(id: number) {
        const user = this.getUserById(id);
        this.currentUserToEditSubject.next(user);
    }

    /**
     * 
     * @param id - id of the user
     * 
     * sets the user to view in the card
     */
    setUserToView(id: number) {

        const user = this.getUserById(id);
        this.currentUserToViewSubject.next(user);

        if (user !== undefined) {
            const department = this.sharedDataService.getDepartmentById(user.department!);
            this.currentUserToViewDepartmentSubject.next(department);
        }
    }

    /**
     * 
     * @param editedUser - user to be updated with values from the modal
     * 
     * updates the user in the users list with the values from the modal
     */
    editOpenUser(editedUser: User) {
        const editUserIndex = this.usersListSubject.value.findIndex(user => user.id === editedUser.id);
        this.usersListSubject.value[editUserIndex] = editedUser;
        this.currentUserToViewSubject.next(editedUser);
        if (editedUser?.department !== undefined) {
            this.currentUserToViewDepartmentSubject.next(this.sharedDataService.getDepartmentById(editedUser.department!));
        }

        this.saveUsers(this.usersListSubject.value);
    }

    /**
     * save users to localStorage
     */
    private saveUsers(usersList: User[]) {
        localStorage.setItem('taskmanager_users', JSON.stringify(usersList));
    }
}