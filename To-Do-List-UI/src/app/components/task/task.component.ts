import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task',
  standalone: false,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  @Input() task!: Task;

  @Output() edit = new EventEmitter<Task>();

  @Output() delete = new EventEmitter<number>();

  @Output() statusChange = new EventEmitter<{ id: number; status: TaskStatus }>();

}
