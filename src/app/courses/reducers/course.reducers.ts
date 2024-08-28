import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./../action-types";
import { compareCourses, Course } from "./../model/course";

export interface CoursesState extends EntityState<Course> {
  // entities: {[key:number]: Course},
  // ids: number[]
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id,
});

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, state)
  )
);

export const { selectAll } = adapter.getSelectors();
