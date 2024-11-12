import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { users_list } from "./users.list";

@Injectable({providedIn: 'root'})

export class UsersService {
    users_list = users_list;
    private currentUserToEditSubject = new BehaviorSubject<User|undefined>(undefined);
    currentUserToEdit$ = this.currentUserToEditSubject.asObservable();

    private currentUserToViewSubject = new BehaviorSubject<User|undefined>(undefined);
    currentUserToView$ = this.currentUserToViewSubject.asObservable();

    constructor() {
        const users = localStorage.getItem('taskmanager_users');

        if (users) {
            this.users_list = JSON.parse(users);
        }
    }

    /**
     * @param user - user to be added to the users list
     */
    createNewUser(user: User) {
        this.users_list.push(user);
        this.saveUsers();
    }

    /**
     * 
     * @param id - id of the user
     * @returns user who matches the id from the users list
     */
    getUserById(id: number) {
        const user = this.users_list.find(user => user.id === id);
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
        const editUserIndex = this.users_list.findIndex(user => user.id === editedUser.id);
        this.users_list[editUserIndex] = editedUser;
        this.currentUserToViewSubject.next(editedUser);
        this.saveUsers();
    }

    /**
     * save users to localStorage
     */
    private saveUsers() {
        localStorage.setItem('taskmanager_users', JSON.stringify(this.users_list));
    }
}