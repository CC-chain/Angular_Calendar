import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCreatorComponent } from './custom-creator.component';

describe('CustomCreatorComponent', () => {
  let component: CustomCreatorComponent;
  let fixture: ComponentFixture<CustomCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
