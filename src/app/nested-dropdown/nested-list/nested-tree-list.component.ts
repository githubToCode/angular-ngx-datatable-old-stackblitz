import { Component, EventEmitter, Input, Output, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { NestedTreeControl } from '@angular/cdk/tree';
import { VdlTreeNestedDataSource } from 'vdl-angular';

@Component({
  selector: 'nested-tree-list',
  styleUrls: ['../nested-dropdown.component.scss'],
  templateUrl: './nested-tree-list.component.html'
})
export class NestedTreeListComponent implements OnInit{
  reviewFilterModel: any;
  nestedTreeControl: any;
  nestedDataSource: any;
  level: Number = 1;
  constructor(public nestedListRef: ElementRef) {
    this.nestedTreeControl = new NestedTreeControl(this._nesgetChildren);
    this.nestedDataSource = new VdlTreeNestedDataSource();
  }

  @Input() item: Object;
  @Input() selected: Object = null;
  @Output() onToggleChildren = new EventEmitter();
  @Output() onSelectItem = new EventEmitter();

  toggleChildren(path) {
    this.onToggleChildren.emit(path);
  }

  selectItem(selected) {
    console.log('selected==>', selected);
    this.onSelectItem.emit(selected);
  }

  getLabelClasses(child) {
    return `label level-${child.level} ${(this.selected && this.selected.path === child.path) ? 'active' : ''} ${(child.children && child.children.length) ? 'vdl-tree-node' : ''}`;
  }

  hasNestedChild = (_: number, nodeData: any) => nodeData.children;
  private _nesgetChildren = (node: any) => node.children;

  ngOnInit(){
    this.nestedDataSource.data = this.item;
  }

  changeState(node) {
    node.expanded = !node.expanded;
  }
}