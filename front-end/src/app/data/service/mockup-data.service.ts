import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class MockupDataService implements InMemoryDbService{
  createDb(){
     let styles = [
       {
          id : 1,
          name : 'LoginBg',
          backgroundColor: 'rgba(0,0,0,1)',
          color: 'red'
       } ,
       {
          id : 2,
          name : 'LoginContainerBg',
          backgroundColor: 'rgba(255, 99, 71, 1)',
          color: 'green',
       },
       {
        id : 3,
        name : 'CardBg',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        color: '#fff',
       },
        {
        id : 4,
        name : 'FormBg',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        color: '#fff',
       },
      {
        id : 5,
        name : 'ButtonBg',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        color: '#fff',
       }
      ];

      return {styles};
    };

  }

