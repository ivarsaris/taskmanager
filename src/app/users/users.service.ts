import { Injectable } from "@angular/core";
import { DepartmentsService } from "../departments/departments.service";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "./user.model";
import { users_list } from "./users.list";
import { Department } from "../departments/department.model";

@Injectable({providedIn: 'root'})

export class UsersService {

    private currentUserToEditSubject = new BehaviorSubject<User|undefined>(undefined);
    currentUserToEdit$ = this.currentUserToEditSubject.asObservable();

    private currentUserToViewSubject = new BehaviorSubject<User|undefined>(undefined);
    currentUserToView$ = this.currentUserToViewSubject.asObservable();

    private usersListSubject = new BehaviorSubject<User[]>(users_list);
    usersList$ = this.usersListSubject.asObservable();

    deparmentList$: Observable<Department[]>;

    constructor(private departmentsService: DepartmentsService) {
        const users = localStorage.getItem('taskmanager_users');

        if (users) {
            this.usersListSubject.next(JSON.parse(users));
        }

        this.deparmentList$ = this.departmentsService.departmentList$;
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
        this.saveUsers(this.usersListSubject.value);
    }

    /**
     * save users to localStorage
     */
    private saveUsers(usersList: User[]) {
        localStorage.setItem('taskmanager_users', JSON.stringify(usersList));
    }
}