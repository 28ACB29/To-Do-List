import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

const API_BASE = '/api/task'; // relative pa

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  private load(): void {
    this.http.get<Task[]>(API_BASE)
      .subscribe({
        next: tasks => this.tasksSubject.next(tasks),
        error: () => this.tasksSubject.next([])
      });
  }
}
