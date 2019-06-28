import { Injectable } from '@angular/core';

@Injectable()
export class SerializableService {

  public deserialize(hex): any[] {
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
      const v = parseInt(hex.substr(i, 2), 16);
      if (v) {
        str += String.fromCharCode(v);
      }
    }

    const params = [];
    let res = '';

    for (let i = 0; i <= str.length; i++) {
      if (str.charCodeAt(i) > 31) {
        res = res + str[i];
      } else {
        params.push(res);
        res = '';
      }
    }
    params.pop();
    return params;
  }
}
