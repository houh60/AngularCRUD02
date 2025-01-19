import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.css'
})
export class ListEmployeesComponent implements OnInit {

  employees: Employee[];
  filteredEmployees: Employee[];
  departments: Department[];
  dataFromChild: any;
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  };
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(this._searchTerm);
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.departments = this.employeeService.getDepartments();
    this.filteredEmployees = this.employees;
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1);
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }

  showDetails(id: number) {
    this.router.navigate(['/employees', id]);
  }

}
