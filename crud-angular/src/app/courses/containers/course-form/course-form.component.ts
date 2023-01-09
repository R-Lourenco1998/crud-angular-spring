import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    category: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    //this.form.value.name = 'Angular';
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      name: course.name,
      category: course.category
    })
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSucess(), error => this.onError());

  }

  onCancel(){
    this.location.back();
  }

  onSucess(){
    this.snackBar.open('Curso salvo com sucesso!','', {duration: 5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso','', {duration: 5000});
  }

  public getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')){
      const requiredLength = field?.errors ? field.errors['minlength'].requiredLength : 5;
      return `Tamanho minimo precisa ser de ${requiredLength} caracteres`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength = field?.errors ? field.errors['minlength'].requiredLength : 200;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
