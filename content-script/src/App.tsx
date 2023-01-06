/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import './App.css';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useState, useEffect } from 'react';
import ReviewList, { ReviewListProps, ReviewNode } from './components/ReviewList';

type CourseCode = {
  courseCount: number;
  courseName: string;
}

type RatingDistribution = {
  r5: number;
  r4: number;
  r3: number;
  r2: number;
  r1: number;
  total: number;
}

function App() {
  const [ courseFilter, setCourseFilter ] = useState("all");
  const [ reviewList, setReviewList ] = useState<ReviewListProps>({} as ReviewListProps);
  const [ courseCodes, setCourseCodes ] = useState<CourseCode[]>([] as CourseCode[]);
  const [ ratingsDistributions, setRatingDistributions ] = useState<RatingDistribution>({} as RatingDistribution);
  const ratings = ['r5', 'r4', 'r3', 'r2', 'r1'];

  useEffect(() => {
    queryRMP();
  }, [])

  // Make a network request to rmp somewhere here
  const queryRMP = async () => {
    const graphqlObj = ({
      "query": "query TeacherRatingsPageQuery( $id: ID!) { node(id: $id) { __typename ... on Teacher { id legacyId firstName lastName school { legacyId name id } lockStatus ...StickyHeader_teacher ...RatingDistributionWrapper_teacher ...TeacherMetaInfo_teacher ...TeacherInfo_teacher ...TeacherRatingTabs_teacher } id }}fragment StickyHeader_teacher on Teacher { ...HeaderDescription_teacher}fragment RatingDistributionWrapper_teacher on Teacher { ...NoRatingsArea_teacher ratingsDistribution { total ...RatingDistributionChart_ratingsDistribution }}fragment TeacherMetaInfo_teacher on Teacher { legacyId firstName lastName department school { name id }}fragment TeacherInfo_teacher on Teacher { id lastName numRatings ...RatingValue_teacher ...NameTitle_teacher ...TeacherTags_teacher ...NameLink_teacher ...TeacherFeedback_teacher}fragment TeacherRatingTabs_teacher on Teacher { numRatings courseCodes { courseName courseCount } ...RatingsList_teacher ...RatingsFilter_teacher}fragment RatingsList_teacher on Teacher { id legacyId lastName numRatings school { id legacyId name } ...Rating_teacher ...NoRatingsArea_teacher ratings(first: 20) { edges { cursor node { ...Rating_rating id __typename } } pageInfo { hasNextPage endCursor } }}fragment RatingsFilter_teacher on Teacher { courseCodes { courseCount courseName }}fragment Rating_teacher on Teacher { ...RatingFooter_teacher ...RatingSuperHeader_teacher ...ProfessorNoteSection_teacher}fragment NoRatingsArea_teacher on Teacher { lastName}fragment Rating_rating on Rating { comment flagStatus createdByUser teacherNote { id } ...RatingHeader_rating ...RatingValues_rating ...CourseMeta_rating ...RatingTags_rating ...RatingFooter_rating ...ProfessorNoteSection_rating}fragment RatingHeader_rating on Rating { date class helpfulRating clarityRating isForOnlineClass}fragment RatingValues_rating on Rating { helpfulRating clarityRating difficultyRating}fragment CourseMeta_rating on Rating { attendanceMandatory wouldTakeAgain grade textbookUse isForOnlineClass isForCredit}fragment RatingTags_rating on Rating { ratingTags}fragment RatingFooter_rating on Rating { id comment adminReviewedAt flagStatus legacyId thumbsUpTotal thumbsDownTotal thumbs { userId thumbsUp thumbsDown id } teacherNote { id }}fragment ProfessorNoteSection_rating on Rating { teacherNote { ...ProfessorNote_note id } ...ProfessorNoteEditor_rating}fragment ProfessorNote_note on TeacherNotes { comment ...ProfessorNoteHeader_note ...ProfessorNoteFooter_note}fragment ProfessorNoteEditor_rating on Rating { id legacyId class teacherNote { id teacherId comment }}fragment ProfessorNoteHeader_note on TeacherNotes { createdAt updatedAt}fragment ProfessorNoteFooter_note on TeacherNotes { legacyId flagStatus}fragment RatingFooter_teacher on Teacher { id legacyId lockStatus}fragment RatingSuperHeader_teacher on Teacher { firstName lastName legacyId school { name id }}fragment ProfessorNoteSection_teacher on Teacher { ...ProfessorNote_teacher ...ProfessorNoteEditor_teacher}fragment ProfessorNote_teacher on Teacher { ...ProfessorNoteHeader_teacher ...ProfessorNoteFooter_teacher}fragment ProfessorNoteEditor_teacher on Teacher { id}fragment ProfessorNoteHeader_teacher on Teacher { lastName}fragment ProfessorNoteFooter_teacher on Teacher { legacyId}fragment RatingValue_teacher on Teacher { numRatings ...NumRatingsLink_teacher}fragment NameTitle_teacher on Teacher { id firstName lastName department school { legacyId name id } ...TeacherDepartment_teacher ...TeacherBookmark_teacher}fragment TeacherTags_teacher on Teacher { lastName teacherRatingTags { legacyId tagCount tagName id }}fragment NameLink_teacher on Teacher { id legacyId firstName lastName school { name id }}fragment TeacherFeedback_teacher on Teacher { numRatings}fragment TeacherDepartment_teacher on Teacher { department school { legacyId name id }}fragment TeacherBookmark_teacher on Teacher { id}fragment NumRatingsLink_teacher on Teacher { numRatings}fragment RatingDistributionChart_ratingsDistribution on ratingsDistribution { r1 r2 r3 r4 r5}fragment HeaderDescription_teacher on Teacher { id firstName lastName department school { legacyId name id } ...TeacherTitles_teacher ...TeacherBookmark_teacher}fragment TeacherTitles_teacher on Teacher { department school { legacyId name id }}",
      // "variables": {"id": "VGVhY2hlci0xOTY3MjY3"}
      "variables": {"id": "VGVhY2hlci0xNjEwNDQx"}
    })
    return fetch("https://www.ratemyprofessors.com/graphql", {
          method: "POST",
          body: JSON.stringify(graphqlObj),
          headers: {
              "Authorization": "Basic dGVzdDp0ZXN0"
          }
      })
      .then(res => res.json())
      .then(json => {
        const data = json['data']['node'];
        setReviewList({ reviews: data['ratings']['edges'], teacherId: data['legacyId']});
        setCourseCodes(data['courseCodes']);
        setRatingDistributions(data['ratingsDistribution']);
      });
  }

  const queryFilter = async (courseFilter: string) => {
    const graphqlObj = {"query":"query RatingsListQuery(\n  $count: Int!\n  $id: ID!\n  $courseFilter: String\n  $cursor: String\n) {\n  node(id: $id) {\n    __typename\n    ... on Teacher {\n      ...RatingsList_teacher_4pguUW\n    }\n    id\n  }\n}\n\nfragment RatingsList_teacher_4pguUW on Teacher {\n  id\n  legacyId\n  lastName\n  numRatings\n  school {\n    id\n    legacyId\n    name\n    city\n    state\n    avgRating\n    numRatings\n  }\n  ...Rating_teacher\n  ...NoRatingsArea_teacher\n  ratings(first: $count, after: $cursor, courseFilter: $courseFilter) {\n    edges {\n      cursor\n      node {\n        ...Rating_rating\n        id\n        __typename\n      }\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n  }\n}\n\nfragment Rating_teacher on Teacher {\n  ...RatingFooter_teacher\n  ...RatingSuperHeader_teacher\n  ...ProfessorNoteSection_teacher\n}\n\nfragment NoRatingsArea_teacher on Teacher {\n  lastName\n  ...RateTeacherLink_teacher\n}\n\nfragment Rating_rating on Rating {\n  comment\n  flagStatus\n  createdByUser\n  teacherNote {\n    id\n  }\n  ...RatingHeader_rating\n  ...RatingSuperHeader_rating\n  ...RatingValues_rating\n  ...CourseMeta_rating\n  ...RatingTags_rating\n  ...RatingFooter_rating\n  ...ProfessorNoteSection_rating\n}\n\nfragment RatingHeader_rating on Rating {\n  date\n  class\n  helpfulRating\n  clarityRating\n  isForOnlineClass\n}\n\nfragment RatingSuperHeader_rating on Rating {\n  legacyId\n}\n\nfragment RatingValues_rating on Rating {\n  helpfulRating\n  clarityRating\n  difficultyRating\n}\n\nfragment CourseMeta_rating on Rating {\n  attendanceMandatory\n  wouldTakeAgain\n  grade\n  textbookUse\n  isForOnlineClass\n  isForCredit\n}\n\nfragment RatingTags_rating on Rating {\n  ratingTags\n}\n\nfragment RatingFooter_rating on Rating {\n  id\n  comment\n  adminReviewedAt\n  flagStatus\n  legacyId\n  thumbsUpTotal\n  thumbsDownTotal\n  thumbs {\n    userId\n    thumbsUp\n    thumbsDown\n    id\n  }\n  teacherNote {\n    id\n  }\n}\n\nfragment ProfessorNoteSection_rating on Rating {\n  teacherNote {\n    ...ProfessorNote_note\n    id\n  }\n  ...ProfessorNoteEditor_rating\n}\n\nfragment ProfessorNote_note on TeacherNotes {\n  comment\n  ...ProfessorNoteHeader_note\n  ...ProfessorNoteFooter_note\n}\n\nfragment ProfessorNoteEditor_rating on Rating {\n  id\n  legacyId\n  class\n  teacherNote {\n    id\n    teacherId\n    comment\n  }\n}\n\nfragment ProfessorNoteHeader_note on TeacherNotes {\n  createdAt\n  updatedAt\n}\n\nfragment ProfessorNoteFooter_note on TeacherNotes {\n  legacyId\n  flagStatus\n}\n\nfragment RateTeacherLink_teacher on Teacher {\n  legacyId\n  numRatings\n  lockStatus\n}\n\nfragment RatingFooter_teacher on Teacher {\n  id\n  legacyId\n  lockStatus\n  isProfCurrentUser\n}\n\nfragment RatingSuperHeader_teacher on Teacher {\n  firstName\n  lastName\n  legacyId\n  school {\n    name\n    id\n  }\n}\n\nfragment ProfessorNoteSection_teacher on Teacher {\n  ...ProfessorNote_teacher\n  ...ProfessorNoteEditor_teacher\n}\n\nfragment ProfessorNote_teacher on Teacher {\n  ...ProfessorNoteHeader_teacher\n  ...ProfessorNoteFooter_teacher\n}\n\nfragment ProfessorNoteEditor_teacher on Teacher {\n  id\n}\n\nfragment ProfessorNoteHeader_teacher on Teacher {\n  lastName\n}\n\nfragment ProfessorNoteFooter_teacher on Teacher {\n  legacyId\n  isProfCurrentUser\n}\n","variables":{"count":20,"id":"VGVhY2hlci0xNjEwNDQx","courseFilter": courseFilter,"cursor":null}}
    return fetch("https://www.ratemyprofessors.com/graphql", {
          method: "POST",
          body: JSON.stringify(graphqlObj),
          headers: {
              "Authorization": "Basic dGVzdDp0ZXN0"
          }
      })
      .then(res => res.json())
      .then(json => {
        const data = json['data']['node'];
        setCourseFilter(courseFilter);
        setReviewList({ reviews: data['ratings']['edges'], teacherId: data['legacyId']});
      });
  }

  const handleChange = (event: SelectChangeEvent) => {
    queryFilter(event.target.value);
  }

  return (
    <Stack className="App">
      <Box>
        <Typography>
          {ratingsDistributions && `${ratingsDistributions['total']} Student Ratings`}
        </Typography>
      </Box>
      <Stack>
        <Stack direction='row' spacing={2} mb={2}>
          <FormControl size='small'>
            <Select
              value={courseFilter}
              onChange={handleChange}
            >
              <MenuItem value="all">All Courses</MenuItem>
              {courseCodes && courseCodes.map((course: CourseCode) => (
                <MenuItem 
                  key={course.courseName}
                  value={course.courseName}
                >
                  {course.courseName} ({course.courseCount})
                </MenuItem>
              ))}
                
            </Select>
          </FormControl>
          <FormControl size='small'>
            <Select
              value='all'
              >
              <MenuItem value="all">All Ratings</MenuItem>
              {ratingsDistributions && ratings.map((rating: string) => {
                const ratingCount = ratingsDistributions[rating as keyof RatingDistribution];
                return (ratingCount > 0) ? 
                  <MenuItem key={rating} value={rating}>{rating} ({ratingCount})</MenuItem> 
                  : 
                  null
              })}
            </Select>
          </FormControl>
        </Stack>
        <ReviewList reviews={reviewList.reviews} teacherId={reviewList.teacherId} />
      </Stack>
    </Stack>
  );
}

export default App;
