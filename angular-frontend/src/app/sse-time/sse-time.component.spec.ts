import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SseTimeComponent } from './sse-time.component';

describe('SseTimeComponent', () => {
  let component: SseTimeComponent;
  let fixture: ComponentFixture<SseTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SseTimeComponent]
    });
    fixture = TestBed.createComponent(SseTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
