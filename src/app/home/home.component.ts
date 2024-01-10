import {Component, OnDestroy, OnInit} from '@angular/core';
import {Student} from "../model/student.model";
import {StudentService} from "../service/student.service";
import {StudentStateService} from "../service/student-state.service";
import {Messages} from "primeng/messages";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    public studentService: StudentService,
    public studentState: StudentStateService
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents();
  }

  ngOnDestroy(): void {

  }
}
