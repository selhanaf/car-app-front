import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateModalComponent } from './edit-create-modal.component';

describe('EditCreateModalComponent', () => {
  let component: EditCreateModalComponent;
  let fixture: ComponentFixture<EditCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
