import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateStudentRequest} from "../models/create-student-request.model";
import {StudentStateService} from "../service/student-state.service";
import {StudentService} from "../service/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrl: './new-student.component.css'
})
export class NewStudentComponent {
  studentForm = new FormGroup({
    nrMatricol: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),
    nume: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    an: new FormControl(1, [
      Validators.required,
      Validators.min(1)
    ]),
    sectie: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ])
  })

  constructor(
    private studentService: StudentService,
    private studentState: StudentStateService,
    private router: Router
  ) { }

  onSubmit() {
    this.studentService.createStudent(this.studentForm.value as CreateStudentRequest).subscribe(data=>{
        console.log(data);
      }
    )
  }

  loadHome(){
    this.router.navigate(['/home'])
  }
}
