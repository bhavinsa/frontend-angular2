import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { UtilService } from '../services/util.service';
import { UserService } from '../services/user.service';
import { AppSettings } from '../config/app.settings';

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['../asset/style.css']
})
export class EditComponent implements OnInit {
    public USER_IMG_URL: string = AppSettings.USER_IMG_URL;
    public alertMsg: boolean = false;
    public user: any = {
        "firstName": "",
        "email": "",
        "birthDate": "",
        "country": "",
        "gender": "",
        "hobbyCricket": "",
        "hobbyFootball": ""
    }

    public filesToUpload: Array<File>;
    public upload: Array<File>;
    public randomNum = 0;
    public userId: any;
    constructor(private activatedRoute: ActivatedRoute, public _utilService: UtilService, public _userService: UserService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userId = params['id'];
            this.getData();
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
    getData() {
        this._userService.getUsers({ "_id": this.userId }).subscribe(
            data => {
                let userInfo = data.data[0];
                if (this._utilService.isDefined(userInfo)) {
                    console.log(JSON.stringify(userInfo));

                    //Set date 
                    let userDate = userInfo.birthDate;
                    let dateString: string = userDate.toString();
                    let days: number = parseInt(dateString.substring(8, 10));
                    let months: number = parseInt(dateString.substring(5, 7));
                    let years: number = parseInt(dateString.substring(0, 5));
                    let goodDate: Date = new Date(years + "/" + months + "/" + days);
                    goodDate.setDate(goodDate.getDate() + 2);
                    let date = goodDate.toISOString().substring(0, 10);

                    this.user = {
                        "firstName": userInfo.firstName,
                        "email": userInfo.email,
                        "birthDate": date,
                        "country": userInfo.country,
                        "gender": userInfo.gender,
                        "hobbyCricket": (userInfo.hobby.hobbyCricket == 'true'),
                        "hobbyFootball": (userInfo.hobby.hobbyFootball == 'true'),
                        "imgName": userInfo.imgName
                    }
                }
            },
            err => {
                var Err = JSON.parse(err._body);
                alert(Err.error);
            },
            () => console.log('done loading.')
        );
    }
    saveData() {
        if (this._utilService.isDefined(this.user.firstName) &&
            this._utilService.isDefined(this.user.email) &&
            this._utilService.isDefined(this.user.birthDate) &&
            this._utilService.isDefined(this.user.country) &&
            this._utilService.isDefined(this.user.gender)
        ) {
            //prepare for Image
            let formData: FormData = new FormData();
            if (this._utilService.isDefined(this.filesToUpload)) {
                for (var i = 0; i < this.filesToUpload.length; i++) {
                    formData.append("image", this.filesToUpload[i], this.filesToUpload[i].name);
                }
            }

            //Add other data
            formData.append('_id', this.userId);
            formData.append('firstName', this.user.firstName);
            formData.append('email', this.user.email);
            formData.append('birthDate', this.user.birthDate);
            formData.append('country', this.user.country);
            formData.append('gender', this.user.gender);
            formData.append('hobbyCricket', this.user.hobbyCricket);
            formData.append('hobbyFootball', this.user.hobbyFootball);
            formData.append('oldimgName', this.user.imgName);

            this._userService.update(formData).subscribe(
                data => {
                    console.log('data -->' + JSON.stringify(data));
                    if (this._utilService.isDefined(data)) {
                        alert(data.message);
                        this.getData();
                    }
                },
                err => {
                    var Err = JSON.parse(err._body);
                    alert(Err.message);
                },
                () => console.log('done loading.')
            );

            //Hide Alert Message            
            this.alertMsg = false;
        } else {
            this.alertMsg = true;
        }
    }

}