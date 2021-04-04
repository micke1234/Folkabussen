import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultDataJox } from './resultdata';
import { ResultJoxContent } from './resultjoxcontent';
import { BusLine } from './busline';
import { Stops } from './stops';


@Injectable({
  providedIn: 'root'
})
export class FolkaService {

  constructor(private httpClient: HttpClient) { }
  //locUrl = '/api';
  busUrl = '/buslines';
  stopsUrl = '/stops';

  /*
  public getStuff() {
      console.log('FolkaService getSmartphone');
      return new Promise<ResultJoxContent[]>( (resolve, reject) => {
        this.httpClient.get<any>(this.locUrl)
        .subscribe(
          result => {
            console.log('some result');
            console.log(result.ResponseData.Result);

            resolve(result.ResponseData.Result);
          },
          err => {
            console.log('Some error ' + err);
            reject(err);
          },
        );
      });
    }*/

    public getBuslines(){
        console.log('FolkaService getBuslines');
        return new Promise<BusLine[]>( (resolve, reject) => {
          this.httpClient.get<any>(this.busUrl)
          .subscribe(
            result => {
              console.log('some result');
              console.log(result.ResponseData.Result);

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
              console.log('some result');
              console.log(result.ResponseData.Result);

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
