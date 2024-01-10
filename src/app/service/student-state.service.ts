import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Student} from "../model/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentStateService {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<String | null>(null);
  students$: Observable<Student[]> = this.studentsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<String | null> = this.errorSubject.asObservable();

  constructor() { }

  setStudents(students: Student[]){
    this.studentsSubject.next(students);
  }

  setLoading(loading: boolean){
    this.loadingSubject.next(loading);
  }

  setError(error: String | null){
    this.errorSubject.next(error);
  }
}
