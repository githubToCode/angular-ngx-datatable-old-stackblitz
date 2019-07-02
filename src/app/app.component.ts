import {AfterViewChecked,ChangeDetectorRef,Component,Input,Output,ViewChild} from '@angular/core';
import { Column, DataTableComponent, TableColumn } from 'vdl-angular';
import {dataList} from './mock_data';
import * as _ from 'lodash';
@Component({
  selector: 'vdl-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor() {}
}


