import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

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
    let data = {
      email: this.uname,
      password: this.pass
    }
    this.http.post('http://localhost:8080/users/authentication', data, { headers: {'Content-Type':  'application/json'}}).subscribe(res => {
      if (res['statusText'] == 'OK') {
        this.router.navigateByUrl('/landingpage');
      } else {
        alert("Incorrect username or password")
      }
    })
    //this.router.navigateByUrl('/landingpage');
  };
}
