import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { ProvinceService } from "../main/admin/location/province/province.service";
import { MatPaginator } from "@angular/material";



export class CustomDataSource implements DataSource<any> {

    private dataSubject = new BehaviorSubject<any[]>([]);
    totalRecords: number;
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _service: any) {

    }

    reload(model: any, paginator: MatPaginator) {
        this.loadingSubject.next(true);
        setTimeout(() => {
            this._service.getList(model).pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
                .subscribe(res => {
                    this.dataSubject.next(res.Items);
                    paginator.length = res.Total;
                });
        }, 300);
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log("Connecting data source");
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }

}