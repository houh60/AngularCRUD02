import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsGuardService implements CanActivate {

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.employeeService.getEmployee(route.paramMap.get('id'))
      .pipe(map(employee => {
        if (employee) {
          return true;
        } else {
          this.router.navigate(['notfound']);
          return false;
        }
      }),
        catchError(err => {
          console.log("err: ", err);
          return of(false);
        })
      );
  }
}
