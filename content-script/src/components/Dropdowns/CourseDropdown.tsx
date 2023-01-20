import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { SelectChangeEvent } from "@mui/material/Select/SelectInput"
import { CourseCode } from "../../types/DropdownTypes"

export const CourseDropdown = (courseFilter: string, ratingFilter: string, courseCodes: CourseCode[], handleChange: (course?: string, rating?: string) => any) => {
    return (
        <FormControl size='small'>
            <Select
              value={courseFilter}
              onChange={(e: SelectChangeEvent) => {handleChange(e.target.value)}}
            >
              <MenuItem value="all">All Courses</MenuItem>
              {courseCodes && courseCodes.map((course: CourseCode) => (
                <MenuItem 
                  key={course.courseName}
                  value={course.courseName}
                >
                  {course.courseName} {ratingFilter === "all" && `(${course.courseCount})`}
                </MenuItem>
              ))}
                
            </Select>
        </FormControl>
    )
}
