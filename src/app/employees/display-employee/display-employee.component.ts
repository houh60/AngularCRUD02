import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() notifyDelete = new EventEmitter();

  departments: Department[];
  selectedEmployeeId: string;
  confirmDelete = false;
  error: any;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe({
      next: data => this.departments = data,
      error: error => this.error = error
    });

    this.selectedEmployeeId = this.route.snapshot.paramMap.get('id');
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

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe({
      next: () => console.log(`Employee with id = ${this.employee.id} deleted`),
      error: err => console.log('error: ', err)
    });
    this.notifyDelete.emit(this.employee.id);
  }
}
