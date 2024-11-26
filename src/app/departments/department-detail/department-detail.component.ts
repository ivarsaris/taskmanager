import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from '../department.model';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-department-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.scss'
})
export class DepartmentDetailComponent {
  private departmentService = inject(DepartmentsService);

  private departmentSubscription!: Subscription;
  currentDepartmentToView: Department | undefined = undefined;

  ngOnInit() {
    this.departmentSubscription = this.departmentService.currentDepartmentToView$.subscribe(department => {
      this.currentDepartmentToView = department;
    });
  }

  setDepartmentToEdit(id: number) {
    console.log(id);
  }
}
