import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpartidaComponent } from './newpartida.component';

describe('NewpartidaComponent', () => {
  let component: NewpartidaComponent;
  let fixture: ComponentFixture<NewpartidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpartidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpartidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
