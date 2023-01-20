import FormControl from "@mui/material/FormControl"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import { SelectChangeEvent } from "@mui/material/Select/SelectInput"
import { RatingDistribution } from "../../types/DropdownTypes"

export const RatingDropdown = (ratingFilter: string, courseFilter: string, ratingsDistributions: RatingDistribution, handleChange: (course?: string, rating?: string) => any) => {
    const ratings: (keyof RatingDistribution)[] = ['r5', 'r4', 'r3', 'r2', 'r1'];
    return (
        <FormControl size='small'>
            <Select
              value={ratingFilter}
              onChange={(e: SelectChangeEvent) => {handleChange(undefined, e.target.value)}}
              >
              <MenuItem value="all">All Ratings</MenuItem>
              {ratingsDistributions && ratings.map((rating) => {
                const ratingCount = ratingsDistributions[rating];
                return (ratingCount > 0) ? 
                  <MenuItem key={rating} value={rating}>
                    {rating} {courseFilter === "all" && `(${ratingCount})`}
                  </MenuItem> 
                  : 
                  null
              })}
            </Select>
        </FormControl>
    )
    
}