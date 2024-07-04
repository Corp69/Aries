import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';


import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';


@Component({
  standalone: true,
  imports: [

    CommonModule, 
    CardModule, 
    ToastModule,
    DividerModule, 
    ChartModule,
    BlockUIModule

], 
providers: [MessageService],
templateUrl: './principal.component.html',
styles: ``
})
export default class PrincipalComponent  {
  
    // variable que bloquea la vista
  public Ariesblocked: boolean  = false;

    constructor(
        private messageService: MessageService,
    ){}



  data: any;
  options: any;

  data2: any;
  options2: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'My Second dataset',
                  backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                  borderColor: documentStyle.getPropertyValue('--pink-500'),
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };

      this.options = {
          indexAxis: 'y',
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };


      this.data2 = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  type: 'line',
                  label: 'Dataset 1',
                  borderColor: documentStyle.getPropertyValue('--blue-500'),
                  borderWidth: 2,
                  fill: false,
                  tension: 0.4,
                  data: [50, 25, 12, 48, 56, 76, 42]
              },
              {
                  type: 'bar',
                  label: 'Dataset 2',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: [21, 84, 24, 75, 37, 65, 34],
                  borderColor: 'white',
                  borderWidth: 2
              },
              {
                  type: 'bar',
                  label: 'Dataset 3',
                  backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                  data: [41, 52, 24, 74, 23, 21, 32]
              }
          ]
      };
      
      this.options2 = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder
                  }
              }
          }
      };
  }
}
