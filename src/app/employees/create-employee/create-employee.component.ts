import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;

  departments: Department[];
  previewPhoto = false;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,
    contactPreference: null,
    dateOfBirth: null,
    department: '0',
    isActive: null,
    photoPath: null
  };
  panelTitle: string;

  datePickerConfig: Partial<BsDatepickerConfig> = Object.assign({},
    {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      maxDate: new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()),
      dateInputFormat: 'YYYY/MM/DD'
    }
  );

  male = false;
  female = false;
  contactPreferenceEmail = false;
  contactPreferencePhone = false;
  yes = false;
  no = false;
  error: any;
  createUpdateEmployee: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeService.getDepartments().subscribe({
      next: data => this.departments = data,
      error: error => this.error = error
    });

    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: string) {
    if (id == '0') {
      this.panelTitle = 'Create';
      this.createEmployeeForm?.reset();
    } else {
      this.panelTitle = 'Edit';
      this.employeeService.getEmployee(id)
        .subscribe({
          next: employee => {
            employee.dateOfBirth = new Date(employee.dateOfBirth);
            this.employee = employee
          },
          error: err => console.log("err: ", err)
        });
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  toggleMale() {
    this.male = !this.male;
    if (!this.male) {
      this.employee.gender = null;
    }
  }

  toggleFemale() {
    this.female = !this.female;
    if (!this.female) {
      this.employee.gender = null;
    }
  }

  toggleContactPreferenceEmail() {
    this.contactPreferenceEmail = !this.contactPreferenceEmail;
    if (!this.contactPreferenceEmail) {
      this.employee.contactPreference = null;
    }
  }

  toggleContactPreferencePhone() {
    this.contactPreferencePhone = !this.contactPreferencePhone;
    if (!this.contactPreferencePhone) {
      this.employee.contactPreference = null;
    }
  }

  toggleIsActiveYes() {
    this.yes = !this.yes;
    if (!this.yes) {
      this.employee.isActive = null;
    }
  }

  toggleIsActiveNo() {
    this.no = !this.no;
    if (!this.no) {
      this.employee.isActive = null;
    }
  }

  saveEmployee() {
    if (this.employee.id === null) {
      this.createUpdateEmployee = this.employeeService.addEmployee(this.employee);
    } else {
      this.createUpdateEmployee = this.employeeService.updateEmployee(this.employee);
    }

    this.createUpdateEmployee.subscribe({
      next: (data: Employee) => {
        this.createEmployeeForm.reset();
        this.router.navigate(['/list']);
      },
      error: (error: any) => console.log('error', error)
    });
  }
}
