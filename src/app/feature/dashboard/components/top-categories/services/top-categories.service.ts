import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TopCategories } from "../Dtos/top-categories";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TopCategoriesService {
    URL = 'top-categories.json';

    constructor(private http: HttpClient) {

    }

    getTopCategories(): Observable<TopCategories> {
        return this.http.get<TopCategories>(this.URL);
    }
}