import { Component, OnInit , AfterViewInit ,Input,OnDestroy,HostListener,ViewChild,ViewEncapsulation} from '@angular/core';
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { FlatTreeControl ,NestedTreeControl } from '@angular/cdk/tree';
import { VdlTreeFlatDataSource, VdlTreeFlattener,VdlTreeNestedDataSource ,VdlExpansionPanel} from 'vdl-angular';
import {BehaviorSubject, of as observableOf} from 'rxjs';

/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

@Component({
  selector: 'leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers :[]
})
export class LeftNavComponent implements OnInit, AfterViewInit {
  showLabel = true;
  multi=true;
  presetData =[];
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: VdlTreeNestedDataSource<FileNode>;
  mockData =[{id:'1',name:'abc'},{id:'2',name:'def'}];
  dropdownPlaceHolderText = 'PlaceHolder...';
  dropdownSelected = {
    name: 'Tagger1-5-D1',
    count :5,
    icon: "fa-briefcase",
    id: 6
  };
  leftNaveOpenedToggles = [];
  formattedDropdownData = [];
  dropdownData = [{
        name: 'All Departments',
        icon: "fa-building",
        count :30,
        id: 1,
        children: [
          {
            name: 'Tagger1-D1',
            count :10,
            icon: "fa-briefcase",
            id: 2,
            children: [
              {
                name: 'Tagger1-1-D1',
                count :5,
                icon: "fa-briefcase",
                id: 3,
                children: [
                  {
                    name: 'Tagger1-3e-D1',
                    count :5,
                    icon: "fa-briefcase",
                    id: 4,
                    children: [
                      {
                        name: 'Tagger1-5-D1',
                        count :5,
                        icon: "fa-briefcase",
                        id: 5
                      },
                      {
                        name: 'Tagger1-5-D1',
                        count :5,
                        icon: "fa-briefcase",
                        id: 6
                      }
                    ]
                  },
                  {
                    name: 'Tagger1-3e-D1',
                    count :5,
                    icon: "fa-briefcase",
                    id: 7
                  }
                ]
              },
              {
                name: 'Tagger1-2-D1',
                count :5,
                icon: "fa-briefcase",
                id: 8
              }
            ]
          },
          {
            name: 'Tagger2-D1',
            count :10,
            icon: "fa-briefcase",
            id: 9
          },
          {
            name: 'Tagger2-D3',
            count :10,
            icon: "fa-briefcase",
            id: 10
          }
        ]
      }];

  //added for height cal
    filterPanelOpenedStatus = false;
    deptPanelOpenedStatus = false;
    dynamicFilterHeight = new BehaviorSubject<any>([]);
    openedaccordContenSpace :string;
    @ViewChild('filterPanel') filterPanel: VdlExpansionPanel;
    @ViewChild('deptPanel') deptPanel: VdlExpansionPanel;
    //end of

  constructor(){
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new VdlTreeNestedDataSource();
    
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;

  ngOnInit() {
     this.nestedDataSource.data = this.mockDatabuild();
     this.formattedDropdownData = this.formatDropdownData(this.dropdownData, 0, '0', this.dropdownSelected);
  }

  ngAfterViewInit() {
    
  }

  formatDropdownData(data, level, path) {
    const l = level || 0;
    const p = path || '0';
    return data.map((d, i) => {
      if (d.children && d.children.length) {
        const formattedItem = {...d, level: l, path: `${path}${i+1}`};
        if( this.dropdownSelected && formattedItem.id == this.dropdownSelected.id) {
          this.dropdownSelected = formattedItem;
        }
        return {...formattedItem, children: this.formatDropdownData(d.children, 1+l, `${path}${i+1}`)};
      } else {
        const formattedItem = {...d, level: l, path: `${path}${i+1}`};
        if( this.dropdownSelected && formattedItem.id == this.dropdownSelected.id) {
          this.dropdownSelected = formattedItem;
        }
        return formattedItem;
      }
    })
  }

   mockDatabuild(){
      let childArr =[]
      let mockDataArray = [];
      for (let j=0 ;j<9;j++){
        let obj ={
          item :'',icon:'',children:[]
        }
        obj.item=`status - ${j}`;
        obj.icon ='';
        childArr.push(obj);
      }
       for(let i=0 ;i<7;i++){
        let mockobj ={
          item :'',icon:'',children:[]
        };
        let presetDataObj =
        { id: '', name: '' };
        mockobj.item =` Appraisal status ${i}`;
        mockobj.icon ='fa-info-circle';
        mockobj.children = childArr;
        presetDataObj.id= `${i}`;
        presetDataObj.name= `item - ${i}`;
        this.presetData.push(presetDataObj)
        mockDataArray.push(mockobj)
      }
      return mockDataArray;
    }
    
    changeState(node) {
    node.expanded = !node.expanded;
  }
  onDropdownSelect(selected) {
    this.dropdownSelected = selected;
  }

  //added for height
  //for height calculation, in actual both dept and filter are two different components, and communicate over a rxjs subject. tried to mimic similar kind.
   @HostListener('window:resize', ['$event'])
  getScreenSize(panel?,flag?) {
   this.getHeightOfEachExpansion(panel,flag);
   this.dynamicFilterHeight.subscribe(data=>{this.openedaccordContenSpace = `${data - 97}px`
   });
   
   }
   openClosePanels(str, status){
     if(str == 'deptPanel'){
       if(status) {
         this.leftNaveOpenedToggles.push(str);
       } else {
         this.leftNaveOpenedToggles = this.leftNaveOpenedToggles.filter(item => item !== str);
       }
     }
     if(str == 'filterPanel'){
       if(status) {
         this.leftNaveOpenedToggles.push(str);
       } else {
         this.leftNaveOpenedToggles = this.leftNaveOpenedToggles.filter(item => item !== str);
       }
     }
  }

  getToggleItemClass(panel) {
    let classStr = 'toggle-item-content';
    if(this.leftNaveOpenedToggles.length === 2) {
      classStr = `${classStr} allOpened`;
    }

    if(this.leftNaveOpenedToggles.indexOf(panel) !== -1) {
      classStr = `${classStr} opened`;
    }

    return classStr;
  }

  getHeightOfEachExpansion(panel?,flag?){
      let numofaccord = 2;
      let accordheight = 45;
      let totalavaliablespace = window.innerHeight - 110 ;
      let avaliablecontentspace =  Math.floor(totalavaliablespace - (accordheight*numofaccord));

    if(flag=='filterPanel'){
      this.filterPanelOpenedStatus = panel._expanded;
    }
    if(flag=='deptPanel'){
    this.deptPanelOpenedStatus = panel._expanded; 
    }
    if(this.filterPanelOpenedStatus && this.deptPanelOpenedStatus){
    this.dynamicFilterHeight.next(avaliablecontentspace - 201);
    }
    else{
      this.dynamicFilterHeight.next(avaliablecontentspace);
    }
}
}