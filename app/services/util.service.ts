import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UtilService {

    isDefined(variable: any) {
        if (typeof variable == 'boolean') return true;
        return (typeof variable !== undefined && variable != null && variable != "");
    }

    getTime() {
        var date = new Date();
        var time = date.getTime();
        return time;
    }

}