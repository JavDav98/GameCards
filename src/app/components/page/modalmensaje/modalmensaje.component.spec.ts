import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalmensajeComponent } from './modalmensaje.component';

describe('ModalmensajeComponent', () => {
  let component: ModalmensajeComponent;
  let fixture: ComponentFixture<ModalmensajeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmensajeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalmensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
