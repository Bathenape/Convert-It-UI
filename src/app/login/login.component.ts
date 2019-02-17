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
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };
    // this.http.post('', {
    //   httpOptions,
    //   email: this.uname,
    //   password: this.pass
    // }).subscribe(res => {
    //   if (res['status'] == 'OK') {
    //     this.router.navigateByUrl('/landingpage');
    //   }
    // })
    this.router.navigateByUrl('/landingpage');
  };
}
