import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirateurComponent } from './aspirateur.component';

describe('AspirateurComponent', () => {
  let component: AspirateurComponent;
  let fixture: ComponentFixture<AspirateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspirateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
