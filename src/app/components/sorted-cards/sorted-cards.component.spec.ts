import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedCardsComponent } from './sorted-cards.component';

describe('SortedCardsComponent', () => {
  let component: SortedCardsComponent;
  let fixture: ComponentFixture<SortedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortedCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
