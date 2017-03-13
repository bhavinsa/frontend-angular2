import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';
import { AppSettings } from '../config/app.settings';

@Component({
    moduleId: module.id,
    selector: 'list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit {
    public USER_IMG_URL: string = AppSettings.USER_IMG_URL;
    public filterQuery = "";
    public userData: any = [];
    public data: any = [];
    constructor(private router: Router, public _utilService: UtilService, public _userService: UserService) {

        this._userService.getUsers([]).subscribe(
            data => {
                if (this._utilService.isDefined(data.data)) {
                    this.data = data.data;
                }
            },
            err => {
                var Err = JSON.parse(err._body);
                alert(Err.error);
            },
            () => console.log('done loading.')
        );

    }
    ngOnInit() { }
    delete(id: any) {
        this._userService.deleteUsers(id).subscribe(
            data => {
                if (this._utilService.isDefined(data)) {
                    alert('Delete successfully.');
                }
            },
            err => {
                var Err = JSON.parse(err._body);
                alert(Err.error);
            },
            () => console.log('done loading.')
        );
    }

    edit(data: any) {
        this.router.navigate(['/edit', data]);
    }
}