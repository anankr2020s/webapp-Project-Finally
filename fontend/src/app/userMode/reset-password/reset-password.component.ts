import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  updateitem = {
    "_id": Number,
    "password": ''
  }
  newPassword = new FormControl('');
  user ='';
  constructor(private AuthServiceService:AuthServiceService) { }

  ngOnInit(): void {
  }

  set(){
    let data = String(localStorage.getItem('user'));
    //console.log(data);
    
    var obj = JSON.parse(data);
    if(obj == undefined){
      this.user= ''
    }else{
      this.updateitem._id = obj._value.result.id;
    }
    //console.log(this.user);
    //console.log(this.newPassword.value);
    this.updateitem.password = this.newPassword.value;
    try {
      this.AuthServiceService.updatePassword(this.updateitem).subscribe(
        data => {

        },
        err => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    alert("Updata Password Successfully")

  }
}
