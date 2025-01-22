import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { Observable, of, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private listEmployees: Employee[];

  private departments: Department[] = [
    { id: 0, name: 'Select Department' },
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Paroll' },
    { id: 5, name: 'Admin' }
  ];

  baseUrl = 'http://localhost:3000/employees1';

  constructor(
    private httpClient: HttpClient
  ) {}

  getEmployees(): Observable<Employee[] | Error> {
    return this.httpClient.get<Employee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("Client side error: ", errorResponse.error.message);
    } else {
      console.log("Server side error: ", errorResponse);
    }
    return throwError(() => new Error('There is a problem with the service. We are notified and working on it. Please try again later.'));
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
      const foundIndex = this.listEmployees.findIndex(e => e.id == employee.id);
      this.listEmployees[foundIndex] = employee;
    }
  }

  deleteEmployee(id: number) {
    const i = this.listEmployees.findIndex(e => e.id == id);
    if (i != -1) {
      this.listEmployees.splice(i, 1)
    }
  }
}
