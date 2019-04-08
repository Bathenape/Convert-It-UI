import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.columnDefs = [
      {headerName: "ID", width: 50,
          valueGetter: 'node.id',
          cellRenderer: 'loadingRenderer'
      },
      {headername: 'HD-3', field: "HD3", sortable: true},
      {headername: 'TS-1', field: "TS1", sortable: true},
      {headername: 'MSH-17', field: "MSH17", sortable: true}
    ]
    this.defaultColDef = { sortable: true }
  }

  private rowdata;
  private dataToSave;

  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  private columnDefs;

  gridOptions = {
    pagination: true,
    paginationPageSize: 100
  }

  ngOnInit() {
    this.http.get('assets/JSONObject.json').subscribe(data => {
      this.dataToSave = data['message']['HL7'];
      console.log(data);
      this.rowdata = [
        {HD3: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-3"]["HD-3"], 
        TS1: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-7"]["TS-1"],
        MSH17: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-17"]},
      ]
    })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.expandAll();
  }

  public changeSettings(pageNumber: number) {
    this.gridOptions.paginationPageSize = pageNumber;
  }

  public download() {
    var file = new File([this.dataToSave], "HL7.txt");
    saveAs(file);
  }

  onPrint() {
    var gridApi = this.gridApi;
    this.setPrinterFriendly(gridApi);
    setTimeout(function() {
      print();
      this.setNormal(gridApi);
    }, 2000);
  }

  private setPrinterFriendly(api) {
    /* var eGridDiv = document.querySelector("table.my-grid");
    eGridDiv.style.width = "";
    eGridDiv.style.height = ""; */
    api.setDomLayout("print");
  }

  private setNormal(api) {
    /* var eGridDiv = document.querySelector(".my-grid");
    eGridDiv.style.width = "600px";
    eGridDiv.style.height = "200px"; */
    api.setDomLayout(null);
  }
}
