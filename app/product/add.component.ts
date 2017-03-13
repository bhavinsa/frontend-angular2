import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';

@Component({
    moduleId: module.id,
    selector: 'add',
    templateUrl: 'add.component.html',
    styleUrls: ['../asset/style.css']
})
export class AddComponent implements OnInit {
    public alertMsg: boolean = false;
    public user: any = {
        "firstName": "",
        "email": "",
        "birthDate": "",
        "country": "",
        "gender": "",
        "hobbyCricket": "",
        "hobbyFootball": "",
        "terms": "",
        "password": ""
    }

    public filesToUpload: Array<File>;
    public upload: Array<File>;
    public randomNum = 0;

    constructor(public _utilService: UtilService, public _userService: UserService) { }

    ngOnInit() { }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    saveData() {
        if (this._utilService.isDefined(this.filesToUpload) &&
            this._utilService.isDefined(this.user.firstName) &&
            this._utilService.isDefined(this.user.email) &&
            this._utilService.isDefined(this.user.password) &&
            this._utilService.isDefined(this.user.birthDate) &&
            this._utilService.isDefined(this.user.country) &&
            this._utilService.isDefined(this.user.gender) &&
            this._utilService.isDefined(this.user.terms)
        ) {
            //prepare for Image
            let formData: FormData = new FormData();
            for (var i = 0; i < this.filesToUpload.length; i++) {
                formData.append("image", this.filesToUpload[i], this.filesToUpload[i].name);
            }
            //Add other data
            formData.append('firstName', this.user.firstName);
            formData.append('email', this.user.email);
            formData.append('password', this.user.password);
            formData.append('birthDate', this.user.birthDate);
            formData.append('country', this.user.country);
            formData.append('gender', this.user.gender);
            formData.append('terms', this.user.terms);

            formData.append('hobbyCricket', this.user.hobbyCricket);
            formData.append('hobbyFootball', this.user.hobbyFootball);
            this._userService.create(formData).subscribe(
                data => {
                    if (this._utilService.isDefined(data.user._id)) {
                        alert('Added successfully.');
                    }
                },
                err => {
                    var Err = JSON.parse(err._body);
                    alert(Err.error);
                },
                () => console.log('done loading.')
            );

            //Hide Alert Message            
            this.alertMsg = false;
        } else {
            this.alertMsg = true;
        }
    }
    hideAlertMsg() {
        this.alertMsg = false;
    }
}