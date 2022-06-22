import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from "@angular/forms";
import {Router} from "@angular/router"
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname:[''],
      email:[''],
      password:[''],
      mobile:['']
    })
  }
  signUp(){
    let userDetails: {};
    // cnsl.lg(this.signupForm.value, this.signupForm.value.email)
    userDetails = {
      'password': this.signupForm.value.password,
      'email': this.signupForm.value.email,
      'Phone': this.signupForm.value.mobile,
      'userName': this.signupForm.value.fullname,
      'userType': 'customer',
      'WishList': [],
      'Completed': []
    };
    // userDetails.password = this.signupForm.value['password'];
    // userDetails['userName'] = this.signupForm.value.fullname;
    // userDetails['Phone'] = this.signupForm.value.mobile
    // userDetails['email'] = this.signupForm.value['email'];
    // userDetails['UserType'] = 'customer'
    // userDetails['WishList'] = []
    // userDetails['Completed'] = []
    // cnsl.lg(userDetails)
    this.http.post<any>("http://localhost:3000/Users", userDetails)
    .subscribe(res=>{
      alert("Sign Up Is Done Succesfully");
      this.signupForm?.reset();
      this.router.navigate(['login']);
    },err=>{
      alert("Something went wrong")
    })
  }
}
