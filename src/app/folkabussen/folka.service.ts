import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusLine } from './busline';
import { Stops } from './stops';


@Injectable({
  providedIn: 'root'
})
export class FolkaService {

  constructor(private httpClient: HttpClient) { }
  busUrl = '/buslines';
  stopsUrl = '/stops';

    public getBuslines(){
        console.log('FolkaService getBuslines');
        return new Promise<BusLine[]>( (resolve, reject) => {
          this.httpClient.get<any>(this.busUrl)
          .subscribe(
            result => {
              resolve(result.ResponseData.Result);
            },
            err => {
              console.log('Some error ' + err);
              reject(err);
            },
          );
        });
    }

    public getStops(){
        console.log('FolkaService getStops');
        return new Promise<Stops[]>( (resolve, reject) => {
          this.httpClient.get<any>(this.stopsUrl)
          .subscribe(
            result => {
              resolve(result.ResponseData.Result);
            },
            err => {
              console.log('Some error ' + err);
              reject(err);
            },
          );
        });
    }

}
