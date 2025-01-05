import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  departments: Department[] = [
    { id: 0, name: 'Select Department' },
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Paroll' },
    { id: 5, name: 'Admin' }
  ];
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
  emailPattern = new RegExp(/^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$/);
  pragEmailPattern = new RegExp(/^[a-zA-Z0-9_.+\-]+@(?:(?:[a-zA-Z0-9\-]+\.)?[a-zA-Z]+\.)?(pragimtech)\.com$/);

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

  constructor(private changeDetector: ChangeDetectorRef) {}

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

  saveEmployee(employee: Employee) {
    // console.log("empForm: ", empForm);
    console.log("employee: ", employee);
  }
}
