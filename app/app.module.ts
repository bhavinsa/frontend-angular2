import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AddComponent } from './product/add.component';
import { ListComponent } from './product/list.component';
import { EditComponent } from './product/edit.component';

//Service 
import { UtilService } from './services/util.service';
import { UserService } from './services/user.service';

//Directives
import { HeaderComponent } from './directives/header.component';

//DataTableModule
import {DataTableModule} from "angular2-datatable";
import { DataFilterPipe }   from './filters/data-filter.pipe';
@NgModule({
  declarations: [AppComponent, AddComponent, ListComponent, EditComponent, DataFilterPipe, HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    DataTableModule
  ],
  providers: [UtilService, UserService],
  bootstrap: [AppComponent]
})

export class AppModule {
}