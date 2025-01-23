import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

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
  error: any;

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
    private route: ActivatedRoute
  ) {
    const resolvedData: Employee[] | string = this.route.snapshot.data['employeeList'];
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      this.error = resolvedData;
    }

    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe({
      next: data => this.departments = data,
      error: error => this.error = error
    });
  }

  filterEmployees(searchString: string) {
    return this.employees && this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1);
  }

  onDeleteNotification(id: string) {
    const i = this.filteredEmployees.findIndex(e => e.id == id);
    if (i != -1) {
      this.filteredEmployees.splice(i, 1)
    }
  }
}
