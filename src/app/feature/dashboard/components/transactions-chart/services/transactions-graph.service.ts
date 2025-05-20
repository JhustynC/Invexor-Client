import { Injectable } from "@angular/core";
import { TransactionStatistics } from "../Dtos/transaction-statistics";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TransactionsGraphService {
    
    URL = 'transaction-graph.json';

    constructor(private http: HttpClient) {

    }
    
    gettransactionStatisticsByMonth(): Observable<TransactionStatistics> {
        return this.http.get<TransactionStatistics>(this.URL);
    }
}