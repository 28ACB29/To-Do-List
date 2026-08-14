import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';


@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];

  @Output() edit = new EventEmitter<Task>();

  @Output() delete = new EventEmitter<number>();

  @Output() statusChange = new EventEmitter<{ id: number; status: TaskStatus }>();

}
