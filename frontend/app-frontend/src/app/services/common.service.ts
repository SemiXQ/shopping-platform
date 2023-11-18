import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // Time
  getCurrentTimeStamp(): number {
    const localTime = new Date();
    const utcTime = new Date(localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), 
                            localTime.getUTCHours(), localTime.getUTCMinutes(), localTime.getUTCSeconds());
    return Math.floor(utcTime.getTime() / 1000);
  }
}
