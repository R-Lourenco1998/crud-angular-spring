package com.ricardo.crudspring.controller;

import com.ricardo.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import com.ricardo.crudspring.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
@CrossOrigin()
public class CourseController {


    @Autowired
    private CourseRepository courseRepository;


    @GetMapping
    public @ResponseBody List<Course> list(){
    return courseRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Course create(@RequestBody Course course){
       return courseRepository.save(course);
    }

}



/*
    Passando a resposta correta através de Response Entity.
    Melhor alternativa quando é necessário manusear a resposta.
    @PostMapping
    public ResponseEntity<Course> create(@RequestBody Course course){
       return ResponseEntity.status(HttpStatus.CREATED)
               .body(courseRepository.save(course));
    }
*/
