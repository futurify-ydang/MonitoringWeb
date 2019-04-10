import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { HistoryService } from 'app/common/history.service';
import { ReqDialogHistory } from './req-dialog-history';
import { ResDialogHistory, Log } from './res-dialog-history';

@Component({
    selector: 'dialog-history',
    templateUrl: 'dialog-history.html',
    styleUrls: ['dialog-history.scss']
})
export class DialogHistoryComponent implements OnInit {
    data: ReqDialogHistory;
    histories: Log[];
    total: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) data: ReqDialogHistory,
        public dialogRef: MatDialogRef<DialogHistoryComponent>,
        private _historyService: HistoryService
    ) {
        this.data = data;
    }
    ngOnInit(): void {
        this.getHistory();
    }

    onClose(): void {
        this.dialogRef.close();
    }

    getHistory(): void{
        if (this.data.id){
            this._historyService.getHistory(this.data.type, this.data.id, this.data.page, this.data.length).subscribe((res) => {
                this.histories = res.Items;
                this.total = res.Total;
            });
        }
    }

    loadMore(): void{
        if (this.data.length < this.total){
            this.data.length = this.data.length + 5;
            this.getHistory();
        }
    }
}
