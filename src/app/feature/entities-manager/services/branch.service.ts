import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BranchDto, UpdateBranchDto } from '../interfaces/branch.dto';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
    http = inject(HttpClient);
    apiURL: string = environment.ENV_APP_BASE_URL.replace(/\/$/, '');

    constructor() {}

    getAllBranches(): Observable<BranchDto[]> {
    return this.http.get<BranchDto[]>(`${this.apiURL}/branch`);
    }

    getBranchById(id: string): Observable<BranchDto> {
        return this.http.get<BranchDto>(`${this.apiURL}/branch/${id}`);
    }

    createBranch(branch: BranchDto): Observable<BranchDto> {
        return this.http.post<BranchDto>(`${this.apiURL}/branch`, branch);
    }

    updateBranch(id: string, branch: UpdateBranchDto): Observable<BranchDto> {
        return this.http.put<BranchDto>(`${this.apiURL}/branch/${id}`, branch);
    }

    deleteBranch(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/branch/${id}`);
    }
}
