import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Appointment {
  title: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointmentsSubject = new BehaviorSubject<Appointment[]>([]);
  appointments$ = this.appointmentsSubject.asObservable();

  getAppointments() {
    return this.appointmentsSubject.value;
  }

  addAppointment(appointment: Appointment) {
    const appointments = this.appointmentsSubject.value;
    appointments.push(appointment);
    this.appointmentsSubject.next(appointments);
  }

  deleteAppointment(index: number) {
    const appointments = this.appointmentsSubject.value;
    appointments.splice(index, 1);
    this.appointmentsSubject.next(appointments);
  }
}
