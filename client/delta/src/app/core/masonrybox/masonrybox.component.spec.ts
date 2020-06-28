import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryboxComponent } from './masonrybox.component';

describe('MasonryboxComponent', () => {
  let component: MasonryboxComponent;
  let fixture: ComponentFixture<MasonryboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
