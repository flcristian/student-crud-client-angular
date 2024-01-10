import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {StudentStateService} from "./student-state.service";
import {Student} from "../model/student.model";
import {catchError, Observable, pipe, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private server = "http://localhost:5216/api/v1/Students";

  constructor(private http: HttpClient, private studentState: StudentStateService) { }

  getStudents(){
    this.studentState.setLoading(true);
    this.http.get<Student[]>(this.server + "/all")
    .pipe(
      catchError(this.handleError)
    ).subscribe(
      {
        next: students => {
          this.studentState.setStudents(students);
          this.studentState.setLoading(false);
        },
        error: error => {
          this.studentState.setError(error);
          this.studentState.setLoading(false);
        }
      }
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
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
