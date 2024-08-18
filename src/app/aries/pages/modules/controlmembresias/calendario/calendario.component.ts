import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


//? calendario 
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions }    from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin          from '@fullcalendar/daygrid';
import { CardModule }         from 'primeng/card';
import { DividerModule }      from 'primeng/divider';
import interactionPlugin      from '@fullcalendar/interaction';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CalendarioService } from './Services/Calendario.service';







@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [

  
    //angular 
    CommonModule,

    //prime
    CardModule,
    DividerModule,
    TooltipModule,
    ButtonModule,



    //proyecto de terceros
    FullCalendarModule


  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})
export default  class CalendarioComponent implements OnInit {
  
public calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  weekends: false, // initial value
  plugins: [dayGridPlugin, interactionPlugin],
  dateClick: (arg) => this.handleDateClick(arg),
  events:   []
};

  
constructor( private service: CalendarioService ) { }


 public ngOnInit(): void {
  this.service.getCalendario().subscribe( resp => {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      weekends: false, // initial value
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (arg) => this.handleDateClick(arg),
      events:  resp.Detalle.calendario_citas.data
    }
  });
  }


 
 public  handleDateClick( arg: any  ) {
   // alert('date click! ' + arg.dateStr)
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

}
