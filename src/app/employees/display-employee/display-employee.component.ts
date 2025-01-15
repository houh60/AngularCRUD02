import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrl: './display-employee.component.css'
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {

  departments: Department[];

  @Input() employee: Employee;

  @Output() notify = new EventEmitter();

  // private _employeeId: number;
  // @Input()
  // set employeeId(val: number) {
  //   this._employeeId = val;
  // };
  // get employeeId(): number {
  //   return this._employeeId;
  // }

  // private _employee: Employee;
  // @Input()
  // set employee(val: Employee) {
  //   this._employee = val;
  // };
  // get employee(): Employee {
  //   return this._employee;
  // }


  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.departments = this.employeeService.getDepartments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // for (const propName of Object.keys(changes)) {
    //   const change = changes[propName];

    //   if (propName == 'employee') {
    //     const from = JSON.stringify(change.previousValue && change.previousValue.name);
    //     const to = JSON.stringify(change.currentValue.name);
    //     console.log(propName + ' changed from ' + from + ' to ' + to);
    //   } else if (propName == 'employeeId') {
    //     const from = JSON.stringify(change.previousValue);
    //     const to = JSON.stringify(change.currentValue);
    //     console.log(propName + ' changed from ' + from + ' to ' + to);
    //   }
    // }
  }

  handleClick() {
    this.notify.emit(this.employee);
  }

}
