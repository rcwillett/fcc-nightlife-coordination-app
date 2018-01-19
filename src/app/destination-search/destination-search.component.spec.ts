import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSearchComponent } from './destination-search.component';

describe('DestinationSearchComponent', () => {
  let component: DestinationSearchComponent;
  let fixture: ComponentFixture<DestinationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
