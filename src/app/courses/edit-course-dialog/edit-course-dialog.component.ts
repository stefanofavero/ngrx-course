import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { courseUpdated } from "../courses.actions";
import { Course } from "./../model/course";

@Component({
  selector: "course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
})
export class EditCourseDialogComponent {
  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: "create" | "update";

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ["", Validators.required],
      category: ["", Validators.required],
      longDescription: ["", Validators.required],
      promo: ["", []],
    };

    if (this.mode == "update") {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode == "create") {
      this.form = this.fb.group({
        ...formControls,
        url: ["", Validators.required],
        iconUrl: ["", Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value,
    };

    const update: Update<Course> = {
      id: course.id,
      changes: course,
    };

    this.store.dispatch(courseUpdated({ update }));

    this.dialogRef.close();
  }
}
