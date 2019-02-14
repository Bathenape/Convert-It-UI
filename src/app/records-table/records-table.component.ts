import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

  constructor(private http: HttpClient) {}

  columndefs = [
    {headername: 'message', field: 'message'}
  ];

  rowdata;

  ngOnInit() {
    this.http.get('assets/JSONObject.json').subscribe(data => {
      console.log(data.valueOf());
      this.rowdata = data.valueOf();
    })
  }

}
