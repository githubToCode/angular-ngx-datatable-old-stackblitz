import { Component, EventEmitter, Input, Output, OnInit, AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as _ from 'lodash';

@Component({
 selector: 'nested-list',
 styleUrls: ['./nested-dropdown.component.scss'],
 template: `
  <ul>
    <li *ngFor="let child of item; let i = index;" [class]="i == (item.length -1) ? 'lastInGroup' : ''">
      <span #listItemsRef [class]="getLabelClasses(child, selected)" tabindex="0" (keydown)="onSelectItemKeyDown($event, child)" (click)="selectItem(child)">
        <span *ngIf="child.children && child.children.length" [class]="getToggleSwitchClass(child.path)" (click)="toggleChildren(child.path)">
          <vdl-icon
            fontSet="fontawesome"
            fontIcon="{{child.open ? 'fa-angle-down' : 'fa-angle-right'}}"
            class="vdl-icon-rtl-mirror">
          </vdl-icon>
        </span>
        {{child.name}}
        <span class="bottomBorder"></span>
      </span>
      <nested-list *ngIf="child.open" [item]="child.children" [selected]="selected" (onToggleChildren)="toggleChildren($event)" (onSelectItem)="selectItem($event)"></nested-list>
    </li>
  </ul>
 `,
})
export class NestedListComponent implements OnInit {
  constructor(private nestedListRef: ElementRef) {}
  @Input() item: Object;
  @Input() selected: Object = null;
  @Output() onToggleChildren = new EventEmitter();
  @Output() onSelectItem = new EventEmitter();
  @ViewChildren('listItemsRef') listItemsRef:QueryList<any>;
  clerTimer: Any = null;

  ngOnInit() {
    if(this.clerTimer) {
      clearTimeout(this.clerTimer);
    }
    this.clerTimer = setTimeout(() => {
      this.listItemsRef.toArray()[0].nativeElement.focus();
    });
  }

  toggleChildren(path) {
    this.onToggleChildren.emit(path);
  }

  selectItem(selected) {
    this.onSelectItem.emit(selected);
  }

  onSelectItemKeyDown($event, selected) {
    // console.log($event.which);
    // 38 = up
    // 39 = right
    // 40 = down
    if($event.which === 39){
      $event.preventDefault();
      const toggleElement = $event.target.children[0];
      const toggleElementClassList = toggleElement.classList;
      if(toggleElement && toggleElementClassList.contains('toggleSwitch')) {
        this.onToggleChildren.emit(toggleElementClassList[1]);
      }
    }

    if($event.which === 38){
      $event.preventDefault();
      const parentsParent = $event.target.parentElement.parentElement;
      if(parentsParent && parentsParent.tagName.toLowerCase() === 'ul') {
        if($event.target.parentElement.previousElementSibling){
          const childListonParent = $event.target.parentElement.previousElementSibling.children[1];
          if(childListonParent && childListonParent.tagName.toLowerCase() === 'nested-list') {
            const nestedListItems = childListonParent.children[0].children;
            nestedListItems[(nestedListItems.length - 1)].children[0].focus();
          } else {
            $event.target.parentElement.previousElementSibling.children[0].focus();
          }
        } else {
          parentsParent.parentElement.parentElement.children[0].focus();
        }
      }else {
        $event.target.parentElement.previousElementSibling.children[0].focus();
      }
    }

    if($event.which === 40){
      $event.preventDefault();
      const childList = $event.target.parentElement.children[1];
      const isLstInGroup = $event.target.parentElement.classList.contains('lastInGroup');
      if(childList && childList.tagName.toLowerCase() === 'nested-list') {
        childList.children[0].children[0].children[0].focus();
      } else if(isLstInGroup) {
        if($event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling) {
          $event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].focus();
        }
      } else {
        $event.target.parentElement.nextElementSibling.children[0].focus();
      }
    }
    if($event.which === 13){
      $event.preventDefault();
      this.selectItem(selected);
    }
  }

  getLabelClasses(child, selected) {
    return `label level-${child.level} ${(selected && selected.path === child.path) ? 'active' : ''}`;
  }

  getToggleSwitchClass(path) {
    return `toggleSwitch ${path}`;
  }
}

@Component({
  selector: 'nested-dropdown',
  templateUrl: 'nested-dropdown.component.html',
  styleUrls: ['./nested-dropdown.component.scss'],
})

export class NestedDropdown implements OnInit  {
  constructor(private nestedDropdownRef: ElementRef) {}
  @ViewChild(NestedListComponent) nestedListComponent:NestedListComponent;
   @ViewChild('cusInp') cusInp :ElementRef; //added by s
   inpFocusFlag = false; //added by s
  @Input() data?: Array<Object>;
  @Input() placeHolderText: String;
  @Input() selected: Object = null;
  @Input() spaceAround: number = 0;
  @Input() position: String = 'align';
  @Input() label?: String;
  @Input() groupSelactable: Boolean = false;
  @Input() collapseOnClose: Boolean = true;
  @Output() onSelect = new EventEmitter();
  nestedData: Array<Object> = null;
  showDropdown: Boolean = false;
  dropdownListStyles: any = {};

  positionDropdownList() {
    const { x, y, width, height } = this.nestedDropdownRef.nativeElement.getBoundingClientRect();
    let nlx = 0;
    let nly = 0;
    let nlwidth = 0;
    let nlheight = 0;
    if(this.nestedListComponent && this.nestedListComponent.nestedListRef){
      const nlmRect = this.nestedListComponent.nestedListRef.nativeElement.getBoundingClientRect();
      nlx = (nlmRect && nlmRect.x) || nlx;
      nly = (nlmRect && nlmRect.y) || nly;
      nlwidth = (nlmRect && nlmRect.width) || nlwidth;
      nlheight = (nlmRect && nlmRect.height) || nlheight; 
    }
    const positionStyles = this.getPositionStyles(x, y, width, height, nlx, nly, nlwidth, nlheight);
    this.dropdownListStyles = {
      width: width + this.spaceAround,
      ...positionStyles
    }
  }

  getPositionStyles(x, y, w, h, nlx, nly, nlwidth, nlheight) {
    const { position, spaceAround } = this;
    switch(position) {
      case 'top':
        return {
          left: x - (spaceAround/2),
          top: y - (nlheight+h)
        }
      case 'right':
        return {
          left: x + w,
          top: y
        }
      case 'bottom':
        return {
          left: x - (spaceAround/2),
          top: y + h
        }
      case 'left':
        return {
          left: -w,
          top: y
        }
      case 'center':
        return {
          left: x - (spaceAround/2),
          top: y - (nlheight/2)
        }
      case 'align':
        return {
          left: x - (spaceAround/2),
          top: y
        }
    }
  }

  getPlaceHolderText() {
    return this.placeHolderText || 'Select';
  }

  getDisplayedValue() {
    return (this.selected && this.selected.name) || this.getPlaceHolderText();
  }

  onDropdownSelect(selected) {
    if(!this.groupSelactable && selected.children && selected.children.length) {
      return;
    }
    this.onSelect.emit(selected);
    this.showDropdownList(false);
    this.cusInp.nativeElement.focus();
  }

  onNestedDropdownKeyDown($event) {
    if($event.which === 13){
      this.showDropdownList(!this.showDropdown);
    }
  }

  onToggleDropdown() {
    this.showDropdownList(!this.showDropdown);
  }

  showDropdownList(flag) {
    this.showDropdown = flag;

    if(flag) {
      this.nestedData = this.keepSelectedOpen(this.nestedData);
      this.positionDropdownList();
    }

    if(!flag && this.collapseOnClose) {
      this.nestedData = this.clearOpenedGroups(this.nestedData);
    }
  }

  onToggleChildren(path) {
    this.nestedData = this.findAndReplace(path, this.nestedData);
  }

  onClickOutside(data) {
    const { value } = data;
    if(!value) {
      this.showDropdownList(false);
    }
  }

  getOpenedPaths(selected) {
    let paths = [];
    let pString = '';
    (selected && selected.path) && selected.path.split('').map((p, i) => {
      pString = `${pString}${p}`;
      (i !== 0) && paths.push(pString);
    });
    return paths;
  }

  isItemOpened(openedPaths, path) {
    if(!openedPaths.length){
      return false;
    }
    const itemIndex = openedPaths.indexOf(path);
    return (itemIndex > -1 && (itemIndex+1 < openedPaths.length));
  }

  keepSelectedOpen(data) {
    const openedPaths = this.getOpenedPaths(this.selected);
    return data.map(item => {
      if(item.children && item.children.length) {
        return {...item, open: this.isItemOpened(openedPaths, item.path), children: this.keepSelectedOpen(item.children) }
      } else {
        return item;
      }
    });
  }

  clearOpenedGroups(data) {
    return data.map(item => {
      if(item.children && item.children.length) {
        return {...item, open: false, children: this.clearOpenedGroups(item.children) }
      } else {
        return item;
      }
    });
  }

  findAndReplace(path, data) {
    return data.map(item => {
      if(item.path === path) {
        return {...item, open: item.open ? false : true }
      } else if (item.children && item.children.length) {
        return {...item, children: this.findAndReplace(path, item.children)};
      } else {
        return item;
      }
    })
  }

  ngOnInit() {
    this.nestedData = this.data;
    document.addEventListener('scroll', e => {
      this.positionDropdownList();
    }, true);
    window.addEventListener('resize', e => {
      this.positionDropdownList();
    }, true);
  }

  //added by s
  inpFocus(ev){
    if(ev.type == 'focus'){
      this.inpFocusFlag = true;
    }
    else{
      this.inpFocusFlag = false;
    }
    
  }
};