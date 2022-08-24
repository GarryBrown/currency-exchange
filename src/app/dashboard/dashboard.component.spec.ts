import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardComponent} from './dashboard.component';
import {CurrencyStoreService} from "./services/currency-store.service";
import {of} from "rxjs";
import {CurrenciesStub} from "./stubs/currencies.stub";
import {MockComponents, ngMocks} from "ng-mocks";
import {InputComponent} from "./components/input/input.component";
import {CurrencyItemComponent} from "./components/currency-item/currency-item.component";

const CurrencyStoreServiceSpy =
    jasmine.createSpyObj('CurrencyStoreService',
        ['start', 'stop'], {onDataReceived: of(CurrenciesStub)});

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let service: jasmine.SpyObj<CurrencyStoreService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent, ...MockComponents(InputComponent, CurrencyItemComponent)],
            providers: [{provide: CurrencyStoreService, useValue: CurrencyStoreServiceSpy}]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(CurrencyStoreService) as jasmine.SpyObj<CurrencyStoreService>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render 4 items', () => {
        const currencyItems = ngMocks.findInstances<CurrencyItemComponent>(CurrencyItemComponent);
        expect(currencyItems.length).toEqual(4)
    });

    it('should render pass props', () => {
        const currencyItems = ngMocks.findInstances<CurrencyItemComponent>(CurrencyItemComponent);
        expect(currencyItems[0].name).toEqual(CurrenciesStub[0].code)
        expect(currencyItems[0].price).toEqual(CurrenciesStub[0].value)
    });

    it('should render new value depends of input changes', () => {
        const input = ngMocks.findInstance<InputComponent>(InputComponent);
        spyOn(component, 'amountChange').and.callThrough();
        input.onChange.emit(CurrenciesStub[0].value);
        expect(component.amountChange).toHaveBeenCalledWith(CurrenciesStub[0].value);
        fixture.detectChanges()

        const currencyItems = ngMocks.findInstances<CurrencyItemComponent>(CurrencyItemComponent);
        expect(currencyItems[2].price).toEqual(1)
    });
});
