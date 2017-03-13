//npm install --save @types/lodash
//http://stackoverflow.com/questions/34660265/importing-lodash-into-angular2-typescript-application
import * as _ from "lodash";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter"
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        
        if (query) {
            return _.filter(array, row=>row.email.indexOf(query) > -1);
        }
        return array;
    }
}