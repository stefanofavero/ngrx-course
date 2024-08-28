import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CourseActions } from "./../action-types";
import { compareCourses, Course } from "./../model/course";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
  // entities: {[key:number]: Course},
  // ids: number[]
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
  selectId: (course) => course.id,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  ),

  on(CourseActions.courseUpdated, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
