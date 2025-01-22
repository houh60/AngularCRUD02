import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeListResolverService implements Resolve<Employee[] | string> {

  constructor(
    private employeeService: EmployeeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
    return this.employeeService.getEmployees()
      .pipe(
        catchError(err => of(err))
      );
  }
}
