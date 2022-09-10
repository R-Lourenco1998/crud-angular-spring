import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  //courseService: CoursesService;
  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    //this.courses = [];
    //this.courseService = new CoursesService();
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
       this.onError('Erro ao carregar Cursos.')
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }


  ngOnInit(): void {}

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activateRoute});
  }
}
