import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveblogComponent } from './saveblog.component';

describe('SaveblogComponent', () => {
  let component: SaveblogComponent;
  let fixture: ComponentFixture<SaveblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
