import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {VdlModule} from './vdl-module';
import { AngularSplitModule } from 'angular-split';
import {AppComponent} from './app.component';
import {LeftNavComponent} from './left-nav/leftnav.component';
import {ContentComponent , TempComponent} from './content/content.component';
import {DataTableComponent} from './data-table/datatable.component';
import {CellRendererComponent} from './data-table/cellrenderer.component';
import {NestedDropdown, NestedListComponent} from 
'./nested-dropdown/nested-dropdown.component';
import {ClickOutsideModule} from './directive/click-outside.module';
import {NestedTreeListComponent} from './nested-dropdown/nested-list/nested-tree-list.component' ;
@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    VdlModule,
    AngularSplitModule.forRoot(),
    ClickOutsideModule
  ],
  exports: [
    DataTableComponent,
    CellRendererComponent,
    NestedDropdown
  ],
  declarations: [AppComponent,LeftNavComponent,ContentComponent,DataTableComponent,CellRendererComponent,NestedDropdown,NestedListComponent,TempComponent,NestedTreeListComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}

