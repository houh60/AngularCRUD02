export interface Employee {
  id: number;
  name: string;
  gender: string;
  email?: string;
  phoneNumber?: number;
  contactPreference: string;
  dateOfBirth: Date;
  department: number;
  isActive: string;
  photoPath?: string;
}
