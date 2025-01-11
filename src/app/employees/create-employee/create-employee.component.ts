import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
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
    department: 0,
    isActive: null,
    photoPath: null,
    password: null,
    confirmPassword: null,
  };

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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departments = this.employeeService.getDepartments();
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
    this.employeeService.save(this.employee);
    this.router.navigate(['list']);
  }
}
