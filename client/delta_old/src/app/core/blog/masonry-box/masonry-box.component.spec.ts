import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryBoxComponent } from './masonry-box.component';

describe('MasonryBoxComponent', () => {
  let component: MasonryBoxComponent;
  let fixture: ComponentFixture<MasonryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasonryBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasonryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
