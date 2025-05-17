import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
;
import { Observable } from 'rxjs';
import { JsonFormData } from './jsonFormDataV2.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchJsonServiceV2Service {

  http = inject(HttpClient);

  constructor() {}

  fetchJsonData(url: string): Observable<JsonFormData> {
    return this.http.get<JsonFormData>(url);
  }

}
