export interface Employee {
  id: string;
  name: string;
  gender: string;
  email?: string;
  phoneNumber?: number;
  contactPreference: string;
  dateOfBirth: Date;
  department: string;
  isActive: string;
  photoPath?: string;
}
