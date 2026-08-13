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

  // Expose current value if needed
  getAll(): Observable<Task[]> {
    return this.tasks$;
  }

  add(task: Omit<Task, 'id'>) {
    return this.http.post<Task>(API_BASE, task)
      .pipe(
        tap(created => {
          const current = this.tasksSubject.value;
          this.tasksSubject.next([...current, created]);
        })
      );
  }

  update(task: Task) {
    return this.http.put<void>(`${API_BASE}/${task.id}`, task)
      .pipe(
        tap(() => {
          const updated = this.tasksSubject.value.map(t => t.id === task.id ? task : t);
          this.tasksSubject.next(updated);
        })
      );
  }

  delete(id: number) {
    return this.http.delete<void>(`${API_BASE}/${id}`)
      .pipe(
        tap(() => {
          const filtered = this.tasksSubject.value.filter(t => t.id !== id);
          this.tasksSubject.next(filtered);
        })
      );
  }

  // Optionally force reload from server
  refresh() {
    this.load();
  }
}
