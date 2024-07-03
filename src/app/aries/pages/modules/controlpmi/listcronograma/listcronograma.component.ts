import { Component, OnInit } from '@angular/core';
//shared 
import ProyectosComponent from '@shared/pages/listados/pmi-proyectos/proyectos.component';
//prime
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import {TreeNode} from 'primeng/api';
import {OrganizationChartModule} from 'primeng/organizationchart';
@Component({
  selector: 'app-listcronograma',
  standalone: true,
  imports: [

     //prime 
     CardModule,
     DividerModule,
     OrganizationChartModule,

     //shared 
     ProyectosComponent

  ],
  templateUrl: './listcronograma.component.html',
  styleUrl: './listcronograma.component.scss'
})
export default class ListcronogramaComponent implements OnInit {
  

   public Proyecto: String = " PMI - Ayuntamiento"

   public data1: TreeNode[];

   public data2: TreeNode[];

   public selectedNode: TreeNode;

   constructor(
   ){}

  public  ngOnInit() {
      this.data1 = [{
          label: 'CEO',
          type: 'person',
          styleClass: 'p-person',
          expanded: true,
          data: {name:'Walter White', 'avatar': 'walter.jpg'},
          children: [
              {
                  label: 'CFO',
                  type: 'person',
                  styleClass: 'p-person',
                  expanded: true,
                  data: {name:'Saul Goodman', 'avatar': 'saul.jpg'},
                  children:[{
                      label: 'Tax',
                      styleClass: 'department-cfo'
                  },
                  {
                      label: 'Legal',
                      styleClass: 'department-cfo'
                  }],
              },
              {
                  label: 'COO',
                  type: 'person',
                  styleClass: 'p-person',
                  expanded: true,
                  data: {name:'Mike E.', 'avatar': 'mike.jpg'},
                  children:[{
                      label: 'Operations',
                      styleClass: 'department-coo'
                  }]
              },
              {
                  label: 'CTO',
                  type: 'person',
                  styleClass: 'p-person',
                  expanded: true,
                  data: {name:'Jesse Pinkman', 'avatar': 'jesse.jpg'},
                  children:[{
                      label: 'Development',
                      styleClass: 'department-cto',
                      expanded: true,
                      children:[{
                          label: 'Analysis',
                          styleClass: 'department-cto'
                      },
                      {
                          label: 'Front End',
                          styleClass: 'department-cto'
                      },
                      {
                          label: 'Back End',
                          styleClass: 'department-cto'
                      }]
                  },
                  {
                      label: 'QA',
                      styleClass: 'department-cto'
                  },
                  {
                      label: 'R&D',
                      styleClass: 'department-cto'
                  }]
              }
          ]
      }];

      this.data2 = [{
          label: 'F.C Barcelona',
          expanded: true,
          children: [
              {
                  label: 'F.C Barcelona',
                  expanded: true,
                  children: [
                      {
                          label: 'Chelsea FC'
                      },
                      {
                          label: 'F.C. Barcelona'
                      }
                  ]
              },
              {
                  label: 'Real Madrid',
                  expanded: true,
                  children: [
                      {
                          label: 'Bayern Munich'
                      },
                      {
                          label: 'Real Madrid'
                      }
                  ]
              }
          ]
      }];
  }

  onNodeSelect(event) {

   console.log(  event  )

 }

}
