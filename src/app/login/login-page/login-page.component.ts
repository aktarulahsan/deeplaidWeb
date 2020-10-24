import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form);

    // this.loginInfo = new LoginInfo(this.form.username, this.form.password);
    // this.authService.obtainAccessToken(this.loginInfo);
    // localStorage.setItem("username", this.tokenStorage.getUsername());
    // if(this.tokenStorage.getUsername() !=null){
    //   this.router.navigate(['/user']);
    // }else{
    //   console.log("user id not log in");
    // }
  }

}
