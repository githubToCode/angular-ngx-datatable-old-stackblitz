import {Directive, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  outsideflag = false;

  constructor(private _elementRef: ElementRef) {}

  @Output() public clickOutside : EventEmitter<any> = new EventEmitter();
  @HostListener('click', ['$event']) clickInside(event: any) {
    this.outsideflag = true;
  }
  @HostListener('document:click', ['$event', '$event.target']) public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.isChild(this._elementRef.nativeElement,event.target);

    if (clickedInside) {
      this.clickOutside.emit({
        target: (event.target || null),
        value: true
      });
    }
    else{
      this.clickOutside.emit({
        target: (event.target || null),
        value: false
      });
    }
    event.stopPropagation();
    this.outsideflag = false;
  }

  isChild(parent,child){
    if(!parent.contains(child) && !this.outsideflag){
      return false
    }
    return true;
  }
}
