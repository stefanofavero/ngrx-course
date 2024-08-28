import { EntityState } from "@ngrx/entity";
import { Course } from "../model/course";

export interface CoursesState extends EntityState<Course> {
  // entities: {[key:number]: Course},
  // ids: number[]
}
