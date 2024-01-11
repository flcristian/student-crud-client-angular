import { Component } from '@angular/core';
import {StudentService} from "../service/student.service";
import {StudentStateService} from "../service/student-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    public studentService: StudentService,
    public studentState: StudentStateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentService.getStudents();
  }

  ngOnDestroy() {
  }

  loadAddNewStudent() {
    this.router.navigate(['/create-student'])
  }
}
