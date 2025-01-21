import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsGuardService implements CanActivate {

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const employee = this.employeeService.getEmployee(+route.paramMap.get('id'));
    if (employee) {
      return true;
    } else {
      this.router.navigate(['notfound']);
      return false;
    }
  }
}
