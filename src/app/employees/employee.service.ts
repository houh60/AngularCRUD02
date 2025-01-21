import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private listEmployees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      contactPreference: 'Email',
      email: 'mark@pragimtech.com',
      dateOfBirth: new Date('10/25/1988'),
      department: 3,
      isActive: 'yes',
      photoPath: 'assets/images/mark.png'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      contactPreference: 'Phone',
      phoneNumber: 2345978640,
      dateOfBirth: new Date('11/20/1979'),
      department: 2,
      isActive: 'yes',
      photoPath: 'assets/images/mary.png'
    },
    {
      id: 3,
      name: 'John',
      gender: 'Male',
      contactPreference: 'Phone',
      phoneNumber: 5432978640,
      dateOfBirth: new Date('3/25/1976'),
      department: 3,
      isActive: 'no',
      photoPath: 'assets/images/john.png'
    },
  ];

  private departments: Department[] = [
    { id: 0, name: 'Select Department' },
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Paroll' },
    { id: 5, name: 'Admin' }
  ];

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return of(this.listEmployees).pipe(delay(1000));
  }

  getEmployee(id: number): Employee {
    return this.listEmployees.find(e => e.id == id);
  }

  getDepartments() {
    return of(this.departments);
  }

  save(employee: Employee) {
    if (employee.id == null) {
      const maxId = this.listEmployees.reduce(function(e1, e2) {
        return e1.id > e2.id ? e1 : e2
      }).id;
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    } else {
      const foundIndex = this.listEmployees.findIndex(e => e.id == employee.id)
      this.listEmployees[foundIndex] = employee;
    }
  }
}
