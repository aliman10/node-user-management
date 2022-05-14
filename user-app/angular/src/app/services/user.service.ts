import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private upersons: User[] = [];

  public LoadUsers() {
    return this.httpClient.get(
      'https://user-management-node.herokuapp.com/user');
  }

  public AddUser(user: User) {
    return this.httpClient.post('https://user-management-node.herokuapp.com/user',
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    );

  }
 
 
  public UpdateUser(user: User) {
    return this.httpClient.patch('http://localhost:8001/user/update/'+user.email,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    );

  }

  constructor(private httpClient: HttpClient) { }



  addUser(user: User) {
    this.AddUser(user).subscribe(
      (data: User) => {
        this.upersons.push(data);
      }

    );

  }
  updateUser(user: User) {
   this.UpdateUser(user).subscribe();
  }
  deleteUser(user: User) {
    this.upersons.splice(this.upersons.indexOf(user), 1);
  }

}
