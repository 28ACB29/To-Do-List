import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  addForm: FormGroup;

  editForm: FormGroup | null = null;

  tasks: Task[] = [];

  statuses = Object.values(TaskStatus);

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [TaskStatus.New]
    });
  }
}
