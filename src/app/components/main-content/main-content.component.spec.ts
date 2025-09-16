import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MainContentComponent } from './main-content.component';

describe('MainContentComponent', () => {
  let component: MainContentComponent;
  let fixture: ComponentFixture<MainContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainContentComponent, RouterModule, TranslatePipe],
      providers: [
        provideRouter([
          { path: '', component: MainContentComponent },
          { path: ':lang', component: MainContentComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
