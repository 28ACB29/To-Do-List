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

  ngOnInit() {
    this.taskService.tasks$.subscribe(t => this.tasks = t);
  }

  addTask() {
    if (this.addForm.invalid) return;
    this.taskService.add(this.addForm.value);
    this.addForm.reset({ status: TaskStatus.New });
  }

  startEdit(task: Task) {
    this.editForm = this.fb.group({
      id: [task.id],
      name: [task.name, Validators.required],
      description: [task.description],
      status: [task.status]
    });
  }

  saveEdit() {
    if (!this.editForm) return;
    if (this.editForm.invalid) return;
    this.taskService.update(this.editForm.value as Task);
    this.editForm = null;
  }

  cancelEdit() {
    this.editForm = null;
  }

  deleteTask(id: number) {
    this.taskService.delete(id);
  }

  onStatusChange(payload: { id: number; status: TaskStatus }) {
    const t = this.tasks.find(x => x.id === payload.id);
    if (t) this.taskService.update({ ...t, status: payload.status });
  }
}
