import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { Task } from "../models/task.model";
import { UiService } from "../../services/ui.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();

  text: string;
  day: string;
  reminder = false;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value: boolean) => {
        this.showAddTask = value;
      });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.text) {
      alert("Please add a task");
      return;
    }
    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.onAddTask.emit(newTask);
    this.clearForm();
  }

  clearForm() {
    this.text = null;
    this.day = null;
    this.reminder = false;
  }
}
