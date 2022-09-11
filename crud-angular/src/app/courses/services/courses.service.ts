import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  //Retorna um Observable de um array de cursos
  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
       delay(1000),
      tap(courses => console.log(courses))
    );
  }


  save(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
