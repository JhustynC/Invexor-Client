import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JsonFormData } from '../../interfaces/form.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchJsonService {
  http = inject(HttpClient);

  constructor() {}

  fetchJsonData(url: string): Observable<JsonFormData> {
    return this.http.get<JsonFormData>(url);
  }
}
