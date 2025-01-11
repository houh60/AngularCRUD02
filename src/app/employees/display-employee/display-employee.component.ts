import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  departments: Department[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.departments = this.employeeService.getDepartments();
  }

}
