import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeesComponent } from './employees/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { CanDeactivateGuardService } from './employees/can-deactivate-guard.service';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';

const routes: Routes = [
  { path: 'list', component: ListEmployeesComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },
  { path: 'create', component: CreateEmployeeComponent, canDeactivate: [CanDeactivateGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
