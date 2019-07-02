import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit, ElementRef, ViewChild ,TemplateRef} from '@angular/core';
@Component({
  selector: 'cell-renderer',
  templateUrl: 'cellrenderer.component.html',
})

export class CellRendererComponent implements OnInit  {
  constructor() {}

  @Input() cellTemplate?: TemplateRef<any>;
  @Input() column: Object;
  @Input() row: Object;

  template: Object<any>;

  ngOnInit() {
    console.log(this.column.template);
    this.template = this[this.column.template] || null;
  }

};