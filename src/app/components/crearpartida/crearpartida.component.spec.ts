import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearpartidaComponent } from './crearpartida.component';

describe('CrearpartidaComponent', () => {
  let component: CrearpartidaComponent;
  let fixture: ComponentFixture<CrearpartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearpartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearpartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
