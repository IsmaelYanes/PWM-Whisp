import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceMailRequestComponent } from './voice-mail-request.component';

describe('VoiceMailRequestComponent', () => {
  let component: VoiceMailRequestComponent;
  let fixture: ComponentFixture<VoiceMailRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceMailRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceMailRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
