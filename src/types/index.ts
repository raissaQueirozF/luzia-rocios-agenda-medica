
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  cpf?: string;
  birthDate?: string;
  address?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'staff' | 'patient';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: Specialty;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export type AppointmentStatus = 'scheduled' | 'completed' | 'cancelled' | 'no-show';

export type Specialty = 'gynecology' | 'obstetrics';

export interface Doctor {
  id: string;
  name: string;
  specialty: Specialty[];
  crm: string;
  avatarUrl?: string;
  bio?: string;
}
