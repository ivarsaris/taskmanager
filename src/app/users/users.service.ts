import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { users_list } from "./users.list";

@Injectable({providedIn: 'root'})

export class UsersService {
    users_list = users_list;

    /**
     * @param user - user to be added to the users list
     */
    createNewUser(user: User) {
        this.users_list.push(user);
    }
}