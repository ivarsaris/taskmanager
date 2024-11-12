import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { DepartmentsService } from '../departments.service';

@Component({
  selector: 'app-new-department',
  standalone: true,
  imports: [],
  templateUrl: './new-department.component.html',
  styleUrl: './new-department.component.scss'
})
export class NewDepartmentComponent {

  private departmentsService = inject(DepartmentsService)

  @ViewChild('departmentNameInput') departmentNameInput !: ElementRef;

  createNewDepartment() {
    this.departmentsService.createNewDepartment(this.departmentNameInput.nativeElement.value || '');
  }
}
