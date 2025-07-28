import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaDto } from '../interfaces/area.dto';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  http = inject(HttpClient);
  apiURL: string = environment.apiUrl.replace(/\/$/, '');

  constructor() {}

  getAllAreas(): Observable<AreaDto[]> {
    return this.http.get<AreaDto[]>(`${this.apiURL}/area`);
  }
}
