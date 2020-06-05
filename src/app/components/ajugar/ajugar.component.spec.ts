import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjugarComponent } from './ajugar.component';

describe('AjugarComponent', () => {
  let component: AjugarComponent;
  let fixture: ComponentFixture<AjugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
