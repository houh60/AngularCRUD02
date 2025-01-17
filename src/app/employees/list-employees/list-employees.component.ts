import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  departments: Department[];
  dataFromChild: any;

  // employeeToDisplay: Employee;
  // private arrayIndex = 1;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.departments = this.employeeService.getDepartments();
    // this.employeeToDisplay = this.employees[0];
  }

  // handleNotify(eventData: any) {
  //   this.dataFromChild = eventData;
  // }

  // nextEmployee() {
  //   if (this.arrayIndex < this.employees.length) {
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   } else {
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

}
