import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

/**
 * This group of files handles the navigation bar on the landing page
 * The html file shows where all of the tabs route to using app-routing.module.ts
 */
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showHelp() {
    alert("If you are experiencing any techincal difficulties please call us at (404)-123-1234 or email us at IT@cdc.gov")
  }
}
