import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "../models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentStateService {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  students$: Observable<Student[]> = this.studentsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor() { }

  setStudents(students: Student[]) {
    this.studentsSubject.next(students);
  }

  addStudentToState(newStudent: Student) {
    this.studentsSubject.next([...this.studentsSubject.value, newStudent]);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
