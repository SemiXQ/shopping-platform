import { Injectable } from '@angular/core';
import { Store } from '../data/models/store';
import { Observable, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { STORE_URLS } from '../routes/route';
import { StoreList } from '../data/interfaces/storeInterfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(private http: HttpClient) { }

  // RESTful API: get all stores
  getAllStores(): Observable<Store[]> {
    return this.http.get<StoreList>(STORE_URLS.getAll).pipe(
      map((res: StoreList) => {
        if (res.error !== undefined) {
          console.log("Error in fetching stores: ", res.error);
        }
        return res.stores ?? [];
      }),
      catchError((error: any) => {
        console.log("Error in fetching stores: ", error);
        return of([]);
      })
    );
  }
}
