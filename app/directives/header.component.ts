import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: 'header.component.html'
})
export class HeaderComponent implements OnInit {
    public activeAddCls: boolean = false;
    public activeListCls: boolean = false;
    constructor(private activatedRoute: ActivatedRoute) {
        if (activatedRoute.snapshot.url[0].path == 'add') {
            this.activeAddCls = true;
            this.activeListCls = false;
        }
        if (activatedRoute.snapshot.url[0].path == 'list' || activatedRoute.snapshot.url[0].path == 'edit') {
            this.activeListCls = true;
            this.activeAddCls = false;
        }
    }

    ngOnInit() { }
}