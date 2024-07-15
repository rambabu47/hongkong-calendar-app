import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

interface Appointment {
  date: Date;
  title: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  days: { date: Date, appointments: Appointment[] }[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const start = new Date();
    start.setDate(1);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      this.days.push({ date: new Date(date), appointments: [] });
    }
  }

  openAddAppointmentDialog(): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '250px',
      data: { date: null, title: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const day = this.days.find(d => d.date.toDateString() === result.date.toDateString());
        if (day) {
          day.appointments.push({ date: result.date, title: result.title });
        }
      }
    });
  }

  deleteAppointment(day: { date: Date, appointments: Appointment[] }, index: number): void {
    day.appointments.splice(index, 1);
  }

  drop(event: CdkDragDrop<Appointment[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
