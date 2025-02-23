import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  getSameValueOf(list:any[], critiria:string, value:any){
    let result = [];
    for (let item of list){
      if (item[critiria] == value){
        result.push(item);
      }
    }
    return result.length;
  }
}
