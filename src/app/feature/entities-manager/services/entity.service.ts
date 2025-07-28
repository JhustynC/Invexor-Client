import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { EntityDto } from '../interfaces/entity.dto';

@Injectable({
  providedIn: 'root',
})
export class EntityService {
    http = inject(HttpClient);
    apiURL: string = environment.apiUrl.replace(/\/$/, '');

    constructor() {}

    getAllEntities(): Observable<EntityDto[]> {
    return this.http.get<EntityDto[]>(`${this.apiURL}/entity`);
    }

    getEntityById(id: string): Observable<EntityDto> {
        return this.http.get<EntityDto>(`${this.apiURL}/entity/${id}`);
    }

    createEntity(entity: {entity_type: number}): Observable<EntityDto> {
        return this.http.post<EntityDto>(`${this.apiURL}/entity`, entity);
    }

    updateEntity(id: string, entity: EntityDto): Observable<EntityDto> {
        return this.http.put<EntityDto>(`${this.apiURL}/entity/${id}`, entity);
    }

    deleteEntity(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/entity/${id}`);
    }
}
