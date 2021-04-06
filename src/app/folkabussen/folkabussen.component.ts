import { Component, OnInit } from '@angular/core';
import { FolkaService } from './folka.service';
import { BusLine } from './busline';
import { Stops } from './stops';
import { FormGroup, FormControl } from '@angular/forms';
import { KeyValue } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-folkabussen',
  templateUrl: './folkabussen.component.html',
  styleUrls: ['./folkabussen.component.css']

})
export class FolkabussenComponent implements OnInit {
  folkaservice: FolkaService;
  myMap = new Map<string, number>();   //busline map with number of stops
  stopsMap = new Map<string, string>(); //stops map with stop point number and stop point name
  buslineWithStopsMap = new Map<string, string[]>();
  loader:boolean = false;
  errmesssage: string = "";
  isError: boolean = false;


  keyDescOrder = (a: KeyValue<string,number>, b: KeyValue<string,number>): number => {
    return a.value > b.value ? -1 : (b.value > a.value ? 1 : 0);
    }

  theForm = new FormGroup({
    })

  constructor(folkaservice: FolkaService){
    console.log('FolkabussenComponent constructor');
    this.folkaservice = folkaservice;

  }

  ngOnInit(): void {
    console.log('FolkabussenComponent ngOnInit');
    let stopsArray : string[] = [];
    stopsArray.push("");
    this.buslineWithStopsMap.set("key99", stopsArray);
    console.log('After FolkabussenComponent ngOnInit');
  }


  getBuslines(){
      console.log("getBuslines()");

      this.folkaservice.getBuslines().then(
        response => {  this.handleSuccessfulResponseBusLines(response) ;},
        err => {  this.handleError(err, err.status) ;},
       );
  }

  getStops(){
      console.log("getStops()");
      this.loader = true;

      this.folkaservice.getStops().then(
        response => {  this.handleSuccessfulResponseStops(response) ;},
        err => {  this.handleError(err, err.status) ;},
       );
  }



  public onSubmit(){
    console.log('onSubmit');


    this.myMap.set("key1", 12);
    this.myMap.set("key2", 14);
    this.myMap.set("key3", 3);
    this.myMap.set("key4", 18);
    this.myMap.set("key5", 16);
    this.myMap.set("key6", 34);
    this.myMap.set("key7", 50);
    this.myMap.set("key8", 55);
    this.myMap.set("key9", 65);
    this.myMap.set("key10", 22);
    this.myMap.set("key11", 100);
    this.myMap.set("key12", 1);

    let stopsArray : string[] = [];
    for (let i = 0; i < 1000; i++) {
      console.log ("Block statement execution no." + i);
      var pp = "p"+i;
       stopsArray.push(pp);
    }


      //let collection: any[] = stopsArray;
      //stopsArray.push("111");
      //stopsArray.push("222");
      //stopsArray.push("333");
      // this.loader = false;
      this.buslineWithStopsMap.set("key11", stopsArray);
      this.buslineWithStopsMap.set("key9", stopsArray);
      this.buslineWithStopsMap.set("key8", stopsArray);
       this.loader = false;

  }


  public reset(){
    this.myMap.clear();
    this.buslineWithStopsMap.clear();
    this.theForm.reset();
    this.loader = false;
    this.isError = false;
  }

  handleError(err : string, status : string){
    this.loader = false;
    this.isError = true
    console.log('An error occured',err);
    this.errmesssage = 'Something went wrong: ' + status;
  }

  handleSuccessfulResponseBusLines(response: BusLine[]){
    console.log('the bus resp=',response);
    console.log('the bus resp len=',response.length);

    let numret : number = 0;
    let stopsArray : string[];
    for (var val of response) {
      let key = val.LineNumber;
      let stopPointNumber = val.JourneyPatternPointNumber;

      if(this.myMap.get(key) == null){
        stopsArray = [];
        this.myMap.set(key, 1);
        let stopPointName = this.stopsMap.get(stopPointNumber) as string;

        stopsArray.push(stopPointName)
        this.buslineWithStopsMap.set(key,stopsArray);
      }else{
        numret = this.myMap.get(key) as number;
        numret++;
        this.myMap.set(key, numret);

        stopsArray = this.buslineWithStopsMap.get(key) as string[];
        let stopPointName = this.stopsMap.get(stopPointNumber) as string;
        stopsArray.push(stopPointName);
        this.buslineWithStopsMap.set(key,stopsArray);
      }
    }
    this.loader = false;

    console.log('buslineWithStopsMap',this.buslineWithStopsMap);

    console.log('iterating map=');
    let summa : number = 0;
    this.myMap.forEach((value: number, key: string) => {
        let num = this.myMap.get(key) as number;
        summa +=num;
    });
    console.log('numret=',numret);
    console.log('summa=',summa);


  }

  handleSuccessfulResponseStops(response: Stops[]){
      console.log('the bus resp=',response);
      console.log('the bus resp len=',response.length);
      let map = new Map<string, number>();
      let numret : number = 0;
      for (var val of response) {
        numret++;

        let spNumber = val.StopPointNumber;
        let spName = val.StopPointName;
        let saNumber = val.StopAreaNumber;

        this.stopsMap.set(spNumber, spName);
      }
      this.getBuslines();
    }

}
