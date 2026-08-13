import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }
}
