import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { MongoService } from '../mongo.service';
import { hl7 } from '../models/hl7.model'
import { QueryValueType } from '@angular/compiler/src/core';
import { element } from '@angular/core/src/render3';



@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})



export class RecordsTableComponent implements OnInit {
  constructor(private http: HttpClient, private mongoService: MongoService) {
    this.columnDefs = [
      {headerName: "ID", width: 50,
          valueGetter: 'node.id',
          cellRenderer: 'loadingRenderer'
      },
      {headername: 'Gender', field: "PID-8", sortable: true},
      {headername: 'Country', field: "XAD-6", sortable: true},
      {headername: 'State', field: "XAD-4", sortable: true},
      {headerName: 'Disease', field: "CE-5", sortable: true}
    ]
    this.defaultColDef = { sortable: true }
  }

  private rowdata: any[];
  private data;
  private dataToSave;

  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  private columnDefs;

  private searchStr: string;
  private queryKey: string;
  private queryValue: string;


  gridOptions = {
    pagination: true,
    paginationPageSize: 100
  }

  ngOnInit() {

    this.mongoService.getAllRecords().toPromise().then((response) => {
      this.dataToSave = response.valueOf();
      for(var element in this.dataToSave) {
        this.rowdata = [
          {PID8: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PIDPD1NK1NTEPV1PV2ORCOBRNTEOBXNTECTI"]["ORU_R01-PIDPD1NK1NTEPV1PV2"]["PID"]["PID-8"], 
          XAD6: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PIDPD1NK1NTEPV1PV2ORCOBRNTEOBXNTECTI"]["ORU_R01-PIDPD1NK1NTEPV1PV2"]["PID"]["PID-11"]["XAD-6"],
          XAD4: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PIDPD1NK1NTEPV1PV2ORCOBRNTEOBXNTECTI"]["ORU_R01-PIDPD1NK1NTEPV1PV2"]["PID"]["PID-11"]["XAD-4"],
          CE5: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PIDPD1NK1NTEPV1PV2ORCOBRNTEOBXNTECTI"]["ORU_R01-PIDPD1NK1NTEPV1PV2"]["OBX"]["OBX-5"]["CE-5"]}] 
      }
    });

    /* this.mongoService.getAllRecords().subscribe(
      results => {
        console.log(results);
        this.dataToSave = results.valueOf();
        this.dataToSave.array.forEach(element => {
          this.rowdata = [
            {PID8: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PATIENT_RESULT"]["ORU_R01-ORDER_OBSERVATION"]["ORU_R01-PATIENT"]["PID"]["PID-8"], 
            XAD6: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PATIENT_RESULT"]["ORU_R01-ORDER_OBSERVATION"]["ORU_R01-PATIENT"]["PID"]["PID-11"]["XAD-6"],
            XAD4: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PATIENT_RESULT"]["ORU_R01-ORDER_OBSERVATION"]["ORU_R01-PATIENT"]["PID"]["PID-11"]["XAD-4"],
            CE5: element['message']['HL7']['source']["ORU_R01"]["ORU_R01-PATIENT_RESULT"]["ORU_R01-ORDER_OBSERVATION"]["ORU_R01-OBSERVATION"]["OBX"]["OBX-5"]["CE-5"]}] 
        });
      }
    ); */
    /* this.mongoService.getLocalData().subscribe(
      data => {
        this.rowdata = [
          {HD3: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-3"]["HD-3"], 
          TS1: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-7"]["TS-1"],
          MSH17: data['message']['HL7']['source']["ORU_R01"]["MSH"]["MSH-17"]}
        ]
      }
    ); */
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

  setKey(str: string): void {
    this.queryKey = str;
    console.log(str);
  }

  setValue(str: string): void {
    this.queryValue = str;
  }

  private showQuery() {
    this.columnDefs = [
      {headername: 'Results', field: "Results", sortable: true},
    ]
    let params = {
      key: this.queryKey,
      value: this.queryValue 
    }
    console.log(params);
    this.mongoService.queryRecords(params).subscribe(
      data => {
        this.rowdata = [
          {Results: data}
        ]
      }
    );
  }

  searchStrChange(str: string): void {
    this.searchStr = str;
  }

  private showSearch() {
    this.columnDefs = [
      {headername: 'Results', field: "Results", sortable: true},
    ]
    this.mongoService.searchRecords(this.searchStr).subscribe(
      data => {
        this.rowdata = [
          {Results: data}
        ]
      }
    );
  }

  private showSample() {
    this.columnDefs = [
      {headername: 'Data', field: "Data", sortable: true},
    ]
    this.mongoService.getOneRecord().subscribe(
      data => {
        console.log(data);
        this.rowdata = [
          {Data: data['message']['HL7']['source']["ORU_R01"]["ORU_R01-PATIENT_RESULT"]["ORU_R01-ORDER_OBSERVATION"]["ORU_R01-PATIENT"]["PID"]["PID-8"]}
        ]
      }
    );
  }
}
