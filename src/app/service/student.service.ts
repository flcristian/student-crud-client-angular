import { Injectable } from '@angular/core';
import {Student} from "../models/student.model";
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StudentStateService} from "./student-state.service";
import {CreateStudentRequest} from "../models/create-student-request.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private server = "http://localhost:5277/api/v1/Students";
  constructor(private http: HttpClient, private studentState: StudentStateService) { }

  getStudents(): void {
    this.studentState.setLoading(true);
    this.http.get<Student[]>(this.server + "/all").pipe(
      catchError(this.handleError)
    ).subscribe({
      next: (students) => {
        setTimeout(() => {
          this.studentState.setStudents(students);
          this.studentState.setLoading(false);
        }, 500)
      },
      error: (error) => {
        setTimeout(() => {
          this.studentState.setError(error);
          this.studentState.setLoading(false);
        }, 500)
      }
    });
  }

  createStudent(newStudent: CreateStudentRequest): Observable<Student>{
    return this.http.post<Student>(`${this.server}/create`, newStudent).pipe(
      catchError(this.handleError),
      tap(student => {
        this.studentState.addStudentToState(student)
      })
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = `${error.error.reason} - Error code ${error.status}`;
      } else {
        errorMessage = `An error occurred - Error code ${error.status}`;
      }
    }
    return throwError(()=>errorMessage);
  }
}
