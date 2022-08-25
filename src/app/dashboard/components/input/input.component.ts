import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, Subject, takeUntil, tap} from "rxjs";

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnDestroy {
    amount: FormControl = new FormControl('');
    destroy$: Subject<void> = new Subject<void>();
    @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    @Input() set value(data: number) {
        this.amount.setValue(data);
    }

    ngOnInit(): void {
        this.amount.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(data => parseFloat(data) || 0),
            tap(data => this.onChange.emit(data)),
            takeUntil(this.destroy$)
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
