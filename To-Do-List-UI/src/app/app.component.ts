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

  editingTask: Task | null = null;

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

    const payload = this.addForm.value as Omit<Task, 'id'>;
    this.taskService.add(payload).subscribe({
      next: created => {
        // created contains server-assigned id; BehaviorSubject already updated by service
        this.addForm.reset({ status: TaskStatus.New });
      },
      error: err => {
        console.error('Add failed', err);
        // show user feedback here
      }
    });
  }

  startEdit(task: Task) {
    this.editingTask = task;
  }

  // called by <app-task-edit> when user saves
  onEditSave(updated: Task) {
    this.taskService.update(updated).subscribe({
      // Clear the edit form on success; the BehaviorSubject already updated by service
      next: () => {
        this.editingTask = null;
      },
      error: err => {
        console.error('Update failed', err);
        // show user feedback here
      }
    });
  }

  cancelEdit() {
    this.editingTask = null;
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe({
      next: () => { /* UI updated by service */ },
      error: err => {
        console.error('Delete failed', err);
        // show user feedback here
      }
    });
  }

  onStatusChange(payload: { id: number; status: TaskStatus }) {
    const t = this.tasks.find(x => x.id === payload.id);
    if (!t) return;
    const updated = { ...t, status: payload.status };
    this.taskService.update(updated).subscribe({
      next: () => { /* UI updated by service */ },
      error: err => {
        console.error('Status update failed', err);
        // show user feedback here
      }
    });
  }
}
