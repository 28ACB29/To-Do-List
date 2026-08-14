import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: false,
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  statuses = Object.values(TaskStatus);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [''],
      status: [TaskStatus.New, Validators.required]
    });
  }

}
