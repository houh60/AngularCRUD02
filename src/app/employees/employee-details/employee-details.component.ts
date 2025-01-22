import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { concatMap, of } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  id: number;
  error: any;

  departments: Department[];

  employees: Employee[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData: Employee[] = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    this.employeeService.getDepartments()
      .subscribe(data => {
        if (Array.isArray(data)) {
          this.departments = data;
        } else {
          this.error = data;
        }
      });

    this.route.params.pipe(
      concatMap(params => {
        this.id = +params['id'];
        return of(this.employeeService.getEmployee(this.id));
      })
    ).subscribe(employee => {
      this.employee = employee;
    });
  }

  viewNextEmployee() {
    if (this.id < this.employees.length) {
      this.id = this.id + 1
    } else {
      this.id = 1;
    }
    this.router.navigate(['/employees', this.id], {
      queryParamsHandling: 'preserve'
    });
  }

}
