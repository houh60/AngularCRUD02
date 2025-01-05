import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent {
  employees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: 3,
      isActive: true,
      photoPath: 'assets/images/mark.png',
      password: '',
      confirmPassword: ''
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: 2,
      isActive: true,
      photoPath: 'assets/images/mary.png',
      password: '',
      confirmPassword: ''
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: 3,
      isActive: false,
      photoPath: 'assets/images/john.png',
      password: '',
      confirmPassword: ''
    },
  ];
}
