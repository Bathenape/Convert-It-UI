import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  private uname: string;
  private pass: string;

  unameChange(str: string): void {
    this.uname = str;
  }

  passChange(str: string): void {
    this.pass = str;
  }

  login() {
    if (this.uname != null && this.pass != null) {
      console.log('testing git');
      this.router.navigate(['/landingpage']);
    }
  }
}
