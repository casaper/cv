import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameTitleLeadComponent } from './name-title-lead.component';

describe('NameTitleLeadComponent', () => {
  let component: NameTitleLeadComponent;
  let fixture: ComponentFixture<NameTitleLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameTitleLeadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NameTitleLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
