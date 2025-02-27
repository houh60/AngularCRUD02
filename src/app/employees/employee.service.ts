import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Department } from '../models/department.model';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  departmentsUrl = 'http://localhost:3000/departments';
  employeesUrl = 'http://localhost:3000/employees';

  constructor(
    private httpClient: HttpClient
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeesUrl)
      .pipe(catchError(this.handleError));
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.employeesUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.departmentsUrl)
      .pipe(catchError(this.handleError));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    employee.id = '' + new Date().getTime();
    return this.httpClient.post<Employee>(this.employeesUrl, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(`${this.employeesUrl}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
  }

  deleteEmployee(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.employeesUrl}/${id}`)
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
}
