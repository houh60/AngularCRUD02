import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  departments: Department[];
  selectedEmployeeId: number;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.departments = this.employeeService.getDepartments();
    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id');
  }

  getEmployeeNameAndGender(): string {
    return this.employee.name + ': ' + this.employee.gender;
  }

}
