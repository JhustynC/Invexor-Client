import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AreaDto, UpdateAreaDto } from '../interfaces/area.dto';
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

    getAreaById(id: string): Observable<AreaDto> {
        return this.http.get<AreaDto>(`${this.apiURL}/area/${id}`);
    }

    createArea(area: AreaDto): Observable<AreaDto> {
        return this.http.post<AreaDto>(`${this.apiURL}/area`, area);
    }

    updateArea(id: string, area: UpdateAreaDto): Observable<AreaDto> {
        return this.http.put<AreaDto>(`${this.apiURL}/area/${id}`, area);
    }

    deleteArea(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/area/${id}`);
    }
}
