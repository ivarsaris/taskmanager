import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedDepartmentComponent } from './detailed-department.component';

describe('DetailedDepartmentComponent', () => {
  let component: DetailedDepartmentComponent;
  let fixture: ComponentFixture<DetailedDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
