import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.LoadUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );


  }

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }

  saveUser(user: User) {
    if (this.isNewUser) {
      // add a new user
     this.userService.addUser(user);
      this.users.push(user);
    }
    this.userForm = false;
  }

  updateUser() {
    let selectedUserByEmail = this.users.find(user => user.email === this.editedUser.email);
    if (selectedUserByEmail) {
      selectedUserByEmail.email = this.editedUser.email;
      selectedUserByEmail.firstName = this.editedUser.firstName;
      selectedUserByEmail.lastName = this.editedUser.lastName;
      this.userService.updateUser(this.editedUser);
      this.editUserForm = false;
      this.editedUser = {};
    }
  }

  removeUser(user: User) {
    this.users.splice(this.users.indexOf(user), 1);
    this.userService.deleteUser(user._id).subscribe();
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }

  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

}
