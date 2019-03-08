import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

  constructor(private http: HttpClient) {}

  gridOptions = {
    defaultColDef: {
      filter: true
    },

    pagination: true,

    paginationPageSize: 100,

  }

  columnDefs = [
    {headerName: "ID", width: 50,
        valueGetter: 'node.id',
        cellRenderer: 'loadingRenderer'
    },
    {headername: 'HD-3', field: "HD3", sortable: true},
    {headername: 'TS-1', field: "TS1", sortable: true},
    {headername: 'MSH-17', field: "MSH17", sortable: true}
  ]

  rowdata;

  ngOnInit() {
    this.http.get('assets/JSONObject.json').subscribe(data => {
      console.log(data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-3"]["HD-3"]);
      this.rowdata = [
        {HD3: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-3"]["HD-3"], 
        TS1: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-7"]["TS-1"],
        MSH17: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-17"]},
      ]
    })
  }

  public changeSettings(pageNumber: number) {
    this.gridOptions.paginationPageSize = pageNumber;
  }
}
