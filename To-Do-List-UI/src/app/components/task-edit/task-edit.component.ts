import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  standalone: false,
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent implements OnChanges {
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.form.patchValue({
        id: this.task.id,
        name: this.task.name,
        description: this.task.description ?? '',
        status: this.task.status
      });
    }
  }

  onSave() {
    if (this.form.invalid) return;
    const value = this.form.value as Task;
    this.save.emit(value);
  }

  onCancel() {
    this.cancel.emit();
  }

}
