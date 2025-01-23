import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee;
  id: string;
  error: any;

  departments: Department[];

  employees: Employee[];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const resolvedData: Employee[] | string = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    this.employeeService.getDepartments().subscribe({
      next: data => this.departments = data,
      error: error => this.error = error
    });

    this.route.params.pipe(
      concatMap(params => {
        console.log("params: ", params);
        this.id = params['id'];
        return this.employeeService.getEmployee(this.id);
      })
    ).subscribe({
      next: employee => this.employee = employee,
      error: err => console.log("err: ", err)
    });
  }

  viewNextEmployee() {
    let findIndex = this.employees.findIndex(e => e.id === this.employee.id);
    if (findIndex < this.employees.length - 1) {
      findIndex = findIndex + 1;
    } else {
      findIndex = 0;
    }
    const id = this.employees[findIndex].id;
    this.router.navigate(['employees', id], { queryParamsHandling: 'preserve' })
  }

}
