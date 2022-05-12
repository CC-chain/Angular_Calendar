import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class MockupDataService implements InMemoryDbService{
  createDb(){
     let login = [
       {
          id : 1,
          name : 'LoginContainerBg',
          backgroundColor: 'rgba(42,42,0,1)',
       } ,
      {
        id : 2,
        name : 'ButtonBg',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        color: 'rgba(150,0,0,1)',
        borderColor : 'rgba(150,123,0,1)'
       }
      ];
      let register = [
        {
          id : 1,
          name : 'RegisterContainerBg',
          backgroundColor: 'rgba(0,0,0,1)',
       } ,
      {
        id : 2,
        name : 'RegisterButtonBg',
        backgroundColor: 'rgba(42, 42, 42, 0.8)',
        color: 'rgba(0,0,0,1)',
       }
      ]
      let authlayout = [
         {
          id : 1,
          name : 'AuthLayoutContainerBg',
          backgroundColor: 'rgba(0,0,0,1)',
       } ,
      ]
      return {login, register, authlayout};
    };

  }

