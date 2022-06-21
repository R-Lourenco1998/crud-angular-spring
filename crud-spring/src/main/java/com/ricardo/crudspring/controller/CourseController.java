package com.ricardo.crudspring.controller;

import com.ricardo.crudspring.repository.CourseRepository;
import lombok.AllArgsConstructor;
import model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@AllArgsConstructor
public class CourseController {


    @Autowired
    private CourseRepository courseRepository;


    @GetMapping
    public List<Course> list(){
    return courseRepository.findAll();
    }

}
