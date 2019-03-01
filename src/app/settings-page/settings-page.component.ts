import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private maxRecords: string;
  private recordsPerPage: string;

  maxRecordsChange(str: string): void {
    this.maxRecords = str;
  }

  perPageChange(str: string): void {
    this.recordsPerPage = str;
  }

  updateSettings() {
    alert("Settings Successfully Updated")
  }
}
