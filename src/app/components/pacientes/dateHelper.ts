import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
    format(date: Date, displayFormat: Object): string {
        let day: string = date.getDate().toString();
        day = +day < 10 ? '0' + day : day;
        let month: string = (date.getMonth() + 1).toString();
        month = +month < 10 ? '0' + month : month;
        let year = date.getFullYear();
        return (day + '/' + month + '/' + year);
    }
}