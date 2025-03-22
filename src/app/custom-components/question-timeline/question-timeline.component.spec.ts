import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTimelineComponent } from './question-timeline.component';

describe('QuestionTimelineComponent', () => {
  let component: QuestionTimelineComponent;
  let fixture: ComponentFixture<QuestionTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
