import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import 'rxjs/Rx';

// components list
import { AppComponent } from './app.component';
import { AddComponent } from './product/add.component';
import { ListComponent } from './product/list.component';
import { EditComponent } from './product/edit.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/add',
        pathMatch: 'full'
    },
    { path: 'add', component: AddComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'list', component: ListComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [AddComponent, ListComponent, EditComponent];
