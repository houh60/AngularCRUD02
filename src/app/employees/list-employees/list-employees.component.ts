import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) {
    this.employees = this.route.snapshot.data['employeeList'];

    if (this.route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this.route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe(departments => this.departments = departments);
  }

  filterEmployees(searchString: string) {
    return this.employees && this.employees.filter(employee => employee.name.toLowerCase().indexOf(searchString.toLowerCase()) != -1);
  }

  changeEmployeeName() {
    this.employees[0].name = 'Jordan';
    this.filteredEmployees = this.filterEmployees(this.searchTerm);
  }

  showDetails(id: number) {
    this.router.navigate(['/employees', id], {
      queryParams: { 'searchTerm': this.searchTerm, 'testParam': 'testValue' }
    });
  }

}
