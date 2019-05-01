import { Component, OnInit } from '@angular/core';
import { RecordsTableComponent } from '../records-table/records-table.component';

@Component({
  providers:[RecordsTableComponent],
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor(private rec: RecordsTableComponent) { }

  ngOnInit() {
  }

  private maxRecords: string;
  private recordsPerPage: number;

  maxRecordsChange(str: string): void {
    this.maxRecords = str;
  }

  perPageChange(num: number): void {
    this.recordsPerPage = num;
  }

  updateSettings() {
    this.rec.changeSettings(this.recordsPerPage);
    alert("Settings Successfully Updated")
  }
}
