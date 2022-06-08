import * as WebFont from 'webfontloader';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { FONT_PICKER_CONFIG  } from './font-picker.interfaces';

import { FontInterface, GoogleFontsInterface,
  FontPickerConfigInterface  } from './font-picker.interfaces';

import { DataCsService } from '@app/data/service/data-cs.service';

@Injectable()
export class FontPickerService {
  private apiKey: string = '';

  private baseUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts';

  constructor(private http: HttpClient,
    @Inject(FONT_PICKER_CONFIG) private _config: FontPickerConfigInterface,
    private csService : DataCsService)
  {
    this.apiKey = _config.apiKey || '';
  }

  /**
   * Loads the given font from Google Web Fonts.
   */
  public loadFont(font: FontInterface): void {
    console.log("req")
    try {
      WebFont.load({
        google: {
          families: [font.family + ':' + font.style]
        }
      });
    } catch (e) {
      console.warn('Failed to load the font:', font);
    }
  }

  /**
   * Returns list of all fonts with given sort option:
   * date || alpha || style || trending || popularity
   */

  public getAllFonts(sort: string): Observable<GoogleFontsInterface | null> {
    console.log(this.apiKey , this.baseUrl , this.apiKey)
    if (!this.apiKey) {
      return of(null);
    } else {
      let requestUrl = this.baseUrl + '?key=' + this.apiKey;
      console.log(requestUrl)
      if (sort) {
        requestUrl = requestUrl.concat('&sort=' + sort);
      }
        return <Observable<GoogleFontsInterface>> this.http.get(requestUrl).pipe(
      );

    }
  }

  /**
   * Returns font object for the requested font family.
   */

  public getRequestedFont(family: string): Observable<FontInterface> {
    const requestUrl = 'https://fonts.googleapis.com/css?family=' + family;

    return <Observable<any>> this.http.get(requestUrl).pipe(
      catchError(this.handleHttpError)
    );
  }

  /**
   * Handler method for all possible http request errors.
   */

  private handleHttpError(error: any): Observable<string> {
    console.error(error);

    const errMsg = (error.error instanceof Error) ?
      error.error.message : (error.status || 'Unknown error');

    return of(errMsg);
  }
}
