import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit {

  @Input() employee: Employee;
  @Input() searchTerm: string
  departments: Department[];
  selectedEmployeeId: number;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe(departments => this.departments = departments);
    this.selectedEmployeeId = +this.route.snapshot.paramMap.get('id');
  }

  getEmployeeNameAndGender(): string {
    return this.employee.name + ': ' + this.employee.gender;
  }

  viewEmployee() {
    this.router.navigate(['/employees', this.employee.id], {
      queryParams: { 'searchTerm': this.searchTerm }
    });
  }

  editEmployee() {
    this.router.navigate(['/edit', this.employee.id]);
  }

}
