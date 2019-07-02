import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VdlTable, VdlTableDataSource, VdlPaginator, VdlSort } from 'vdl-angular';
@Component({
  selector: 'data-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  encapsulation: ViewEncapsulation.Native
})

export class DataTableComponent implements OnInit  {
  constructor() {}

  @ViewChild(VdlPaginator) paginator: VdlPaginator;
  @ViewChild(VdlSort) sort: VdlSort;
  @ViewChild('dataTableElm') dataTableElm:ElementRef;

  @Input() showGroupBy?: Boolean;
  @Input() groupByOptions?: Object<Any>;
  @Input() data: Array<Object>;
  @Input() columns: Array<Object>;
  @Input() tableProps: Object<Any>;
  @Input() showPaginator: Boolean;
  @Input() pageSize: Number;
  @Input() pageSizeOptions: Array;
  @Input() cellTemplate?: TemplateRef<any>;

  @Output() onChangeGroupBy = new EventEmitter();
  @Output() onToggleRowGroup = new EventEmitter();

  dataTableSource: Object<Any>;
  displayedColumns: Array = [];
  isMinimumSizeViewTable: Boolean = false;

  ngOnInit() {
    this.setData();
  }

  onSelectionChange($event) {
    this.onChangeGroupBy.emit($event);
  }

  onToggleRowGroups(toggleType) {
    this.onToggleRowGroup.emit(toggleType);
  }

  setData() {
    this.setDisplayedColumns();
    this.dataTableSource = new VdlTableDataSource(this.data);
    if(this.showPaginator) {
      this.dataTableSource.paginator = this.paginator;
    }
    this.dataTableSource.sortingDataAccessor = (data, attribute) => {
      return data[attribute]
    };
    this.dataTableSource.sort = this.sort;

    /*if(this.groupBy.value =='none'){
      this.dataTableSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataTableSource.sort = this.sort;
    }*/
  }

  setDisplayedColumns() {
    this.columns.forEach(( column, index) => {
      this.displayedColumns[index] = column.field;
    });
  }

  isGroup(index, item){
    return item.group;
  }

  cellRenderer(row, column) {
    return column.cellRenderer ? column.cellRenderer(row, column) : row[column.field];
  }

};