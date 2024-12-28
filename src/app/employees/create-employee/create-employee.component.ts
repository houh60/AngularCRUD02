import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  fullName = '';
  email = '';
  gender = '';
  phoneNumber = '';
  contactPreference = '';
  isActive = false;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Paroll' },
    { id: 5, name: 'Admin' }
  ];
  department = '';
  dateOfBirth = null;

  saveEmployee(empForm: NgForm) {
    // console.log("empForm: ", empForm);
    console.log("empForm.value: ", empForm.value);
  }
}
