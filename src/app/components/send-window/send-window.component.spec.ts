import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendWindowComponent } from './send-window.component';

describe('SendWindowComponent', () => {
  let component: SendWindowComponent;
  let fixture: ComponentFixture<SendWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
