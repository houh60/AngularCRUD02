import { Employee } from "../models/employee.model";

export class ResolvedEmployeeList {
  constructor(
    public employeelist: Employee[],
    public error: any = null
  ) {}
}
