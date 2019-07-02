import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  ViewChild, ElementRef,OnInit, HostListener} from '@angular/core';
import { VdlIconRegistry } from 'vdl-angular';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import moment from 'moment';
import mockService from '../service/mockService';
@Component({
  selector: 'content',
  templateUrl: 'content.component.html'
})

export class ContentComponent implements OnInit  {
  
  groups = [
    {
      value: 'none',
      viewValue: 'None'
    },
    {
      value: 'subject',
      viewValue: 'Subject [A-Z]',
      sortBy: 'ASC',
      sortType: 'string'
    },{
      value: 'subject',
      viewValue: 'Subject [Z-A]',
      sortBy: 'DESC',
      sortType: 'string'
    },{
      value: 'author',
      viewValue: 'Author [A-Z]',
      sortBy: 'ASC',
      sortType: 'string'
    },{
      value: 'author',
      viewValue: 'Author [Z-A]',
      sortBy: 'DESC',
      sortType: 'string'
    },
    //some new
    {
      value: 'date',
      viewValue: 'Day (oldest first)',
      sortBy: 'ASC',
      sortType: 'date-day'
    },
    {
      value: 'date',
      viewValue: 'Day (newest first)',
      sortBy: 'DESC',
      sortType: 'date-day'
    },
    {
      value: 'date',
      viewValue: 'Month (oldest first)',
      sortBy: 'ASC',
      sortType: 'date-month'
    },
     {
      value: 'date',
      viewValue: 'Month (newest first)',
      sortBy: 'DESC',
      sortType: 'date-month'
    },
    {
      value: 'policy',
      viewValue: 'Policy Action'
    }
  ];

  maxViewColumns = [
    { field: 'icon', displayValue: 'fa-envelope', icon:true,
      cellRenderer: (row, column) => {
        return `
          <span>
          ${row[column.field]}
          </span>`;
      },
      template: 'cellTemplate'
    },
    { field: 'attachment', displayValue: 'fa-paperclip',icon:true},
    { field: 'comment', displayValue: 'fa-comment',icon:true},
    { field: 'date', displayValue: 'Date',icon:false},
    { field: 'subject', displayValue: 'Subject/Filename',icon:false},
    { field: 'author', displayValue: 'Author',icon:false},
    { field: 'status', displayValue: 'Status',icon:false},
    { field: 'hotwords_hits', displayValue: 'Hotword/hits',icon:false},
    { field: 'capture_method', displayValue: 'Capture method',icon:false},
    { field: 'type', displayValue: 'Type',icon:false},
    { field: 'escalation_status', displayValue: 'Escalation status',icon:false},
    { field: 'escalation_owner', displayValue: 'Escalation owner',icon:false},
    { field: 'escalated_by', displayValue: 'Escalation by',icon:false},
  ];

  minViewColumns = [
    { field: 'icon', displayValue: 'fa-envelope',icon:true },
    { field: 'attachment', displayValue: 'fa-paperclip',icon:true},
    { field: 'comment', displayValue: 'fa-comment',icon:true}
  ];

  columns = [];

  datasource = mockService.getMockData(); // this is api response
  groupBy =  {
    value: 'none',
    viewValue: 'None'
  };
  openedGroups = [];
  dataTableSource: Array<Object> = [];
  groupByColumns: string[] = ['date'];
  expandCollapseText = 'Expand All';
  myDynamicTableWidth = 0;
  minimumSizeViewWidth = 400;
  isMinimumSizeViewTable = false;
  pageSize = 10;

  groupByOptions = {
    selected: {
      value: 'none',
      viewValue: 'None'
    },
    options: this.groups,
    showGroupToggleButtons: true
  }


  dropdownPlaceHolderText = 'PlaceHolder...';
  dropdownSelected = null;
  dropdownData = [
    {
      name: 'Item 01',
      level: 1,
      path: '0',
      children: [
        {
          name: 'Item 001',
          level: 2,
          path: '0.0',
          children: [
            {
              name: 'Item 0001',
              level: 3,
              path: '0.0.0',
            },
            {
              name: 'Item 0002',
              level: 3,
              path: '0.0.1',
            }
          ]
        },
        {
          name: 'Item 002',
          level: 2,
          path: '0.1',
        }
      ]
    },
    {
      name: 'Item 02',
      level: 1,
      path: '1',
    }
  ];

  constructor(private vdlIconRegistry: VdlIconRegistry, private domSanitizer: DomSanitizer) {
    vdlIconRegistry.addSvgIcon(
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular.svg'))
      .addSvgIconInNamespace(
      'custom-svg',
      'angular',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/angular_solidBlack.svg'))
      .addSvgIconSetInNamespace('core',
      domSanitizer.bypassSecurityTrustResourceUrl('https://0t2.github.io/angular-material-notes/svg/core-icon-set.svg'))
      .registerFontClassAlias('fontawesome', 'fa');
      console.log('TempComponent==>',TempComponent);
  }
  

  @HostListener('window:resize') onResize() {
   this.onDynamicTableResize(); // can call this method on panel resize event callback as well, when required
  }

  onDropdownSelect(selected) {
    this.dropdownSelected = selected;
  }

  ngOnInit() {
    /*const request = {
      url: 'http://dummyUrl/Data',
      body: {
        pageNumber: this.paginator.pageIndex,
        pageSize: this.pageSize,
        groupBy: null,
        sortBy: '',
        sortOrder: ''
      }
    }
    mockService.getDataAPI(request).then(response => {
      console.log('pageByRequest', request, response);
    });*/
    this.columns = this.isMinimumSizeViewTable ? this.minViewColumns : this.maxViewColumns;
    this.dataTableSource = this.getDataSourceByGroup();
    //this.onDynamicTableResize(); // can call this method on panel resize event callback as well, when required
  }

  ngAfterViewInit() {
      /*console.log('set data source', this.dataTableSource);
      this.dataTableSource.sortingDataAccessor = (data, attribute) => {
        console.log('test', data, attribute);
        return data[attribute];
      }*/
  }

  onSplitDragEnd($event) {
    //this.onDynamicTableResize(); // can call this method on panel resize event callback as well, when required
  }

  onDynamicTableResize() {
    /*if(this.myDynamicTable) {
      const newWidth = this.myDynamicTable.nativeElement.offsetWidth;
      if(newWidth === this.myDynamicTableWidth) {
        return;
      }else {
        this.myDynamicTableWidth = newWidth;

      }
      if(this.myDynamicTableWidth > this.minimumSizeViewWidth) {
        this.isMinimumSizeViewTable = false;
        this.setData();
      } else {
        this.isMinimumSizeViewTable = true;
        this.setData();
      }
    }*/
  }

  setData() {
    // this.columns = this.isMinimumSizeViewTable ? this.minViewColumns : this.maxViewColumns;
    // this.setDisplayedColumns(this.columns);
    // this.dataTableSource = new VdlTableDataSource(this.getDataSourceByGroup());
    // this.dataTableSource.paginator = this.paginator;

    /*if(this.groupBy.value =='none'){
      this.dataTableSource.sortingDataAccessor = (data, attribute) => data[attribute];
      this.dataTableSource.sort = this.sort;
    }*/
  }

  toggleGroup(groupRow) {
    /*if(groupRow.isGroupExpanded) {
      this.openedGroups = _.pull(this.openedGroups, groupRow.group);
    } else {
      this.openedGroups.push(groupRow.group);
    }
    this.dataTableSource = new VdlTableDataSource(this.getDataSourceByGroup());
    this.dataTableSource.paginator = this.paginator;
    if(this.groupBy.value =='none'){
      this.dataTableSource.sort = this.sort;
    }*/
  }

  onChangeGroupBy($event) {
    /*console.log('this.groupBy==>', this.groupBy);
    console.log('groupby->', typeof this.groupBy)
    this.groupBy = _.find(this.groups, {viewValue: $event.value});
    this.setData();*/

    this.openedGroups = [];
    this.groupByOptions = {
      ...this.groupByOptions,
      selected: _.find(this.groups, {viewValue: $event.value})
    }
  }

sortByKeys(object) {
  const { sortBy, sortType } = this.groupBy;
  const keys = Object.keys(object);
  const sortedKeys = this.getSortedKeys(sortBy, sortType, keys);

  return _.fromPairs(
    _.map(sortedKeys, key => [key, object[key]])
  );
}

getSortedKeys(sortBy, sortType, keys) {
  let sortedKeys = [];
  if(sortType === 'string') {
    if(sortBy === 'DESC') {
      sortedKeys = _.sortBy(keys).reverse();
    } else {
      sortedKeys = _.sortBy(keys);
    }
  }

  if(sortType === 'date-day') {
    if(sortBy === 'DESC') {
      sortedKeys = _.sortBy(keys, key => moment(key, 'MM/DD/YYYY')).reverse();
    } else {
      sortedKeys = _.sortBy(keys, key => moment(key, 'MM/DD/YYYY'));
    }
  }

  if(sortType === 'date-month') {
    if(sortBy === 'DESC') {
      sortedKeys = _.sortBy(keys, key => moment(`01/${key}`, 'DD/MM/YYYY')).reverse();
    } else {
      sortedKeys = _.sortBy(keys, key => moment(`01/${key}`, 'DD/MM/YYYY'));
    }
  }

  return sortedKeys;
}

  getGroupName(element) {
    const { group, count } = element;
    if(group === 'undefined') {
     return `Unspecified (${count})`;
    } 
    if(this.groupBy.sortType === 'date-month') {
      const groupNameSplit = group.split('/');
      return `${moment(`${groupNameSplit[0]}/01/${groupNameSplit[1]}`).format('MMMM YYYY')} (${count})`;
    } else {
      return `${group} (${count})`;
    }
  }

  getDataInGroupByFormat(){
    const groupByData = this.getGroupByData();
    if(this.groupBy.sortBy) {
      return this.sortByKeys(groupByData)
    }
    return groupByData;
  }

  getGroupByData() {
    return _.groupBy(this.datasource, item => {
      if(this.groupBy.sortType !== 'date-month') {
        return item[this.groupBy.value];
      } else {
        const dateValues = item[this.groupBy.value].split('/');
        return `${dateValues[0]}/${dateValues[2]}`;
      }
    });
  }

  getDataSourceByGroup(){
    let dataSourceByGroup = [];
    if(this.groupBy.value != 'none'){
      const groupByFormat = this.getDataInGroupByFormat();
      Object.keys(groupByFormat).map(key => {
        const isGroupExpanded = _.includes(this.openedGroups, key);
        dataSourceByGroup.push({group: key, isGroupExpanded, count:  groupByFormat[key].length});
        if(isGroupExpanded){
          groupByFormat[key].map(item => {
            dataSourceByGroup.push(item);
          });
        }
      });
    }
    else{
      dataSourceByGroup = this.datasource
    }
    return dataSourceByGroup;
  }
  onToggleRowGroup(toggleType) {
    let data = [...this.dataTableSource.data];
    let allGroupRow = [];
    data.map(item => {
      if(item.group)
        allGroupRow.push(item);
    });
    allGroupRow.map(item => {
      if(toggleType == 'expand') {
        this.openedGroups.push(item.group);
      }
      if(toggleType == 'collapse') {
        this.openedGroups = [];
      }
    });
    // this.dataTableSource = new VdlTableDataSource(this.getDataSourceByGroup());
    // this.dataTableSource.paginator = this.paginator;
    // if(this.groupBy.value =='none'){
    //   this.dataTableSource.sort = this.sort;
    // }

  }
}

// {
//   activeRow: any;
//   columnSize: string = 'col-xs-12';
//   detailsPanel: boolean = false;
//   disableSelectionInput: boolean = false;
//   selectionDisabled: any = () => false;
//   lastActiveRow: any;
//   loadingIndicator: boolean = false;
//   reorderable: boolean = true;
//   resizeable: boolean = true;
//   searchInputValue: string;
//   selected = [];
//   selectedTable: string = 'basic';
//   selection: boolean = false;
//   selectionType: string = '';
//   singleRadio: boolean;
//   toolbarColumn: boolean = true;
//   toolbarSearch: boolean = true;
//   toolbarRefresh: boolean = true;
//   pagination: boolean = false;
//   openedGroups: Array<String> = [];
//   groupColumn: string = 'icon';

//   columns = [];
//   dataSource = [];
//   rows = [];
//   myDynamicTableWidth = 0;
//   myDynamicTableHeaderHeight = 0;
//   minimumSizeViewWidth = 400;
//   isMinimumSizeViewTable = true;

//   constructor(private changeDetectorRef: ChangeDetectorRef) {
      
//   }

//   @ViewChild('myDynamicTable') myDynamicTable:ElementRef;

//   ngAfterViewChecked() {
//     this.myDynamicTableWidth = this.myDynamicTable.innerWidth;
//     if(this.myDynamicTableWidth > this.minimumSizeViewWidth) {
//       this.isMinimumSizeViewTable = false;
//       this.myDynamicTableHeaderHeight = 20;
//       this.columns = [
//         { field: 'icon', width: 50, displayValue: 'fa-envelope',icon:true ,resizeable: this.resizeable},
//         { field: 'attachment', width: 50, displayValue: 'fa-paperclip',icon:true,resizeable: this.resizeable},
//         { field: 'comments', width: 50, displayValue: 'fa-comment',icon:true,resizeable: this.resizeable},
//         { field: 'date', width: 100, displayValue: 'Date',icon:false,resizeable: this.resizeable},
//         { field: 'subject', width: 100, displayValue: 'Subject/Filename',icon:false,resizeable: this.resizeable},
//         { field: 'author', width: 50, displayValue: 'Author',icon:false, resizeable: this.resizeable },
//         { field: 'status', width: 20, displayValue: 'Status',icon:false, resizeable: this.resizeable },
//         { field: 'hotwords_hits', width: 50, displayValue: 'Hotword/hits',icon:false, resizeable: this.resizeable },
//         { field: 'capture_method', width: 50, displayValue: 'Capture method',icon:false, resizeable: this.resizeable },
//         { field: 'type', width: 50, displayValue: 'Type',icon:false, resizeable: this.resizeable },
//         { field: 'escalation_status', width: 50, displayValue: 'Escalation status',icon:false, resizeable: this.resizeable },
//         { field: 'escalation_owner', width: 50, displayValue: 'Escalation owner',icon:false, resizeable: this.resizeable },
//         { field: 'escalated_by', width: 50, displayValue: 'Escalation by',icon:false, resizeable: this.resizeable }
//       ];
//     } else {
//       this.isMinimumSizeViewTable = true;
//       this.myDynamicTableHeaderHeight = 0;
//       this.columns = [
//         { field: 'icon', width: 50, displayValue: '', icon:true,resizeable: false},
//         { field: 'subject', width: 200, displayValue: '',icon:false,resizeable: this.resizeable},
//         { field: 'date', width: 120, displayValue: 'Date',icon:false,resizeable: this.resizeable}
//       ];
//     }
//     this.dataSource = this.getFormatDataSource(dataList);
//     this.rows = this.getDataSourceByGroupConfigs(this.dataSource);
//   }

//   updateColumnOrder(columns, fromIndex, toIndex) {
//     const movedColumn = this.columns.find((item, index) => index === fromIndex);
//     const remainingColumns = this.columns.filter((item, index) => index !== fromIndex);
  
//     const newColumns = [
//         ...remainingColumns.slice(0, toIndex),
//         movedColumn,
//         ...remainingColumns.slice(toIndex)
//     ];
//     return newColumns;
//   }

//   reordered($event) {
//     const { column, newValue, prevValue } = $event;
//     this.columns = this.updateColumnOrder(this.columns, prevValue, newValue);
//     this.groupColumn = this.columns[0].field;
//   }

//   isGroupColumn(columnName) {
//     return columnName === this.groupColumn;
//   }

//   toggleGroup(groupRow) {
//     if(groupRow.isGroupExpanded) {
//       this.openedGroups = _.pull(this.openedGroups, groupRow.id);
//     } else {
//       this.openedGroups.push(groupRow.id);
//     }
//     this.rows = this.getDataSourceByGroupConfigs(this.dataSource);
//   }

//   getFormatDataSource(data) {
//     return data.map((item, index) => {
//       const hasChildren = (item.children && item.children.length > 0) ? true : false;
//       return {...item, id: `groupId-${index}`, hasChildren}
//     });
//   }

//   getDataSourceByGroupConfigs(data){
//     const newDataSource = data;
//     let dataSourceByGroup = [];
//     newDataSource.map((groupItem, groupIndex) => {
//       const isGroupExpanded = _.includes(this.openedGroups, groupItem.id);
//       dataSourceByGroup.push({...groupItem, isGroupExpanded});
//       if(groupItem.hasChildren && isGroupExpanded) {
//         groupItem.children.map((childItem, childIndex) => {
//           dataSourceByGroup.push(childItem);
//         });
//       }
//     });
//     return dataSourceByGroup;
//   }
// }


//For templateRef;
@Component({
 selector: 'tempTxt',
 template: `
   <div>
    'Txt'
   </div>
 `,
})
export class TempComponent {
 print(){
   console.log('text');
 }
}