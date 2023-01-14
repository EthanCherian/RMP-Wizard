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

type DropdownProp = {
    course: string;
    rating: string;
};

const json = {
  "data": {
      "node": {
          "courseCodes": [
              {
                  "courseCount": 6,
                  "courseName": "100"
              },
              {
                  "courseCount": 1,
                  "courseName": "43753"
              },
              {
                  "courseCount": 624,
                  "courseName": "CJ100"
              },
              {
                  "courseCount": 10,
                  "courseName": "CJ100001"
              },
              {
                  "courseCount": 5,
                  "courseName": "CJ100320"
              },
              {
                  "courseCount": 26,
                  "courseName": "CJ101"
              },
              {
                  "courseCount": 1,
                  "courseName": "CJ10110"
              },
              {
                  "courseCount": 13,
                  "courseName": "CJ220"
              },
              {
                  "courseCount": 1,
                  "courseName": "CJ250"
              },
              {
                  "courseCount": 9,
                  "courseName": "CJ300"
              },
              {
                  "courseCount": 62,
                  "courseName": "CJ395"
              },
              {
                  "courseCount": 1,
                  "courseName": "CJ483"
              },
              {
                  "courseCount": 33,
                  "courseName": "CJ490"
              },
              {
                  "courseCount": 1,
                  "courseName": "CRIM100"
              },
              {
                  "courseCount": 1,
                  "courseName": "CRIM101"
              },
              {
                  "courseCount": 1,
                  "courseName": "CRM100"
              },
              {
                  "courseCount": 1,
                  "courseName": "EDM260"
              }
          ],
          "department": "Criminal Justice",
          "firstName": "Douglas",
          "id": "VGVhY2hlci0xNjEwNDQx",
          "lastName": "Klutz",
          "legacyId": 1610441,
          "numRatings": 796,
          "ratingsDistribution": {
              "r1": 0,
              "r2": 0,
              "r3": 2,
              "r4": 6,
              "r5": 788,
              "total": 796
          },
      }
  }
};

const REVIEWS = [
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjA=",
        "node": {
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "This was by far the easiest class I took. The tests can be taken anywhere, I always just did them in my room. All the notes are posted on blackboard and there is no homework. I got an A+ and almost never went to class. He always shared really interesting topics and was a great speaker. He's also a dilf. ",
            "date": "2023-01-12 22:55:54 +0000 UTC",
            "difficultyRating": 1,
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MzI3MjI3",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37327227,
            "ratingTags": "Hilarious--Respected--Accessible outside class",
            "textbookUse": -1,
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "By far my favorite class of last semester. 3 tests that are very upfront and align with the notes given in class. Most definitely would take his class again!",
            "createdByUser": false,
            "date": "2023-01-12 04:02:37 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MzIzMzY3",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37323367,
            "ratingTags": "Clear grading criteria--Hilarious--Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjI=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 3,
            "class": "100",
            "comment": "He is overall an amazing professor but beware the class is m aade of 3 test. If you do poorly on one test, you are not aloud to retake and are almost guarantied of not finishing with an A. ",
            "createdByUser": false,
            "date": "2022-12-30 05:48:09 +0000 UTC",
            "difficultyRating": 2,
            "flagStatus": "UNFLAGGED",
            "grade": "B+",
            "helpfulRating": 3,
            "id": "UmF0aW5nLTM3MjYyOTY1",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37262965,
            "ratingTags": "Hilarious--Graded by few things--Accessible outside class",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjM=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "The grade is entirely made up of the tests which are open note. While attendance is not mandatory or necessary to pass the class, I recommend going to lecture as often as you can because Klutz is the most interesting man to listen to. Thoroughly enjoyed his class 10/10.",
            "createdByUser": false,
            "date": "2022-12-20 04:12:24 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MTk4Mjgz",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37198283,
            "ratingTags": "Amazing lectures --Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjQ=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Klutz is a great professor. Gives amazing lectures that are always engaging. You don't technically have to go to class as he posts all the powerpoints, but I would recommend it as it is always super interesting. Tests are very easy. He is very caring and willing to answer questions about class or anything CJ related. Take him!",
            "createdByUser": false,
            "date": "2022-12-19 21:41:58 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MTkyOTEw",
            "isForCredit": false,
            "isForOnlineClass": false,
            "legacyId": 37192910,
            "ratingTags": "Caring--Respected--Accessible outside class",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjU=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Klutz is the most kind professor I have ever had. His lectures are amazing and very engaging. I was never bored in class and looked forward to always going. He responds to emails so fast and is so clear. Gave free extra credit at end of semester and rounds everyone's grades. If you want to take CJ take Klutz! If his class is full he is worth wait",
            "createdByUser": false,
            "date": "2022-12-08 18:39:53 +0000 UTC",
            "difficultyRating": 2,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MDMxOTEw",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37031910,
            "ratingTags": "Amazing lectures --Clear grading criteria--Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjY=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Best professor ever. His lectures were so engaging and easy to follow. Attendance is not mandatory but I recommend going because you can learn so much from him. Grades are based on 3 tests that he reviews very clearly before each test. He is super nice and always wants to help his students out.",
            "createdByUser": false,
            "date": "2022-12-07 17:15:11 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM3MDA3NDgz",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 37007483,
            "ratingTags": "Amazing lectures --Clear grading criteria--Caring",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjc=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Best teacher ever. Attendance is not required and your overall grade is only based on three tests. If you pay attention to the power points, you will have all the answers.",
            "createdByUser": false,
            "date": "2022-11-17 17:59:34 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2ODU1MzQx",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36855341,
            "ratingTags": "Amazing lectures --Gives good feedback--Graded by few things",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjg=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": null,
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Great professor. Brings in real-life examples and is clear when teaching tough subjects. Tests can be taken wherever you want and they are multiple-choice. You can download the presentations in Power Point, no need to go to class.",
            "createdByUser": false,
            "date": "2022-11-11 02:10:55 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2ODE1MzAy",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36815302,
            "ratingTags": "Amazing lectures --Hilarious--Caring",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjk=",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2023-01-04 16:42:57 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "100",
            "comment": "Amazing professor to have for CJ 100.",
            "createdByUser": false,
            "date": "2022-10-21 21:27:07 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2NzI0NTcw",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36724570,
            "ratingTags": "",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjEw",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-12-27 01:45:54 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "He is awesome!  Everyone should take his class.  4 tests on material covered in class.  Test were online even though it was an in person class. Lecture notes sent to you after each class so you can really pay attention to him speaking. Take him...you won't be sorry.",
            "createdByUser": false,
            "date": "2022-08-18 01:54:02 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2NTk0MDQ1",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36594045,
            "ratingTags": "Clear grading criteria--Caring--Graded by few things",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjEx",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-11-28 22:23:37 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "This class consisted of 3 tests.  His lecture notes are all online and tests are taken during regular class time at home online. No proctoring fee. Take him!  You won't be sorry.  Very easy class and minimal time needed to spend on it. ",
            "createdByUser": false,
            "date": "2022-06-13 18:13:56 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2NDYwNTU1",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36460555,
            "ratingTags": "Clear grading criteria--Respected--Graded by few things",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjEy",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-11-16 21:51:11 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "One of my Favorite teachers at the University! His lectures are not mandatory but, I highly recommend attending them they are very interesting and easy to understand.",
            "createdByUser": false,
            "date": "2022-05-25 16:13:41 +0000 UTC",
            "difficultyRating": 2,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2NDA0OTE0",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36404914,
            "ratingTags": "Caring--Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjEz",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-10-18 20:18:00 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Attendance is not required. Only grades are 3 tests that are taken online. Super easy.",
            "createdByUser": false,
            "date": "2022-05-09 15:51:05 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2Mjg1NTE3",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36285517,
            "ratingTags": "Caring--Graded by few things--Accessible outside class",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE0",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-09-29 21:00:03 +0000 UTC",
            "attendanceMandatory": "N",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Loved this class so much I decided to make criminal justice my minor. Klutz just has a way of making his lectures feel like conversations, I would take any class he teaches!",
            "createdByUser": false,
            "date": "2022-05-04 15:05:33 +0000 UTC",
            "difficultyRating": 3,
            "flagStatus": "UNFLAGGED",
            "grade": "",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MjM4MzU0",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36238354,
            "ratingTags": "Amazing lectures",
            "teacherNote": null,
            "textbookUse": 0,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE1",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-09-26 02:26:11 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "My fav professor at UA. A genuinely knowledgable and kind guy. Will literally help you out with anything. His lectures are super interesting. im not a CJ major but I enjoyed his class more than my major courses. I recommend going to every class and being engaged because you will gain so much from him. ",
            "createdByUser": false,
            "date": "2022-05-03 14:40:44 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MjI1MTQ5",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36225149,
            "ratingTags": "Amazing lectures --Inspirational--Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE2",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-08-26 18:34:36 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Professor Klutz is so wise and knows what he's talking about. He knows how to explain the material in a way to make all of his students understand. His Lectures are the best, not only does he make his lectures fun and interesting but also relatable to his students lives as college students and the importance of knowing our rights! Highly recommend!",
            "createdByUser": false,
            "date": "2022-04-19 15:21:08 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MTAyMDY3",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36102067,
            "ratingTags": "Amazing lectures --Hilarious--Respected",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE3",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-08-18 21:16:04 +0000 UTC",
            "attendanceMandatory": "",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "It was a very easy class that was also very informative and interesting. Whether it's your major/minor, or you just need an extra class, I would highly recommend him. ",
            "createdByUser": false,
            "date": "2022-04-14 23:47:57 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MDgxODU0",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36081854,
            "ratingTags": "",
            "teacherNote": null,
            "textbookUse": null,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE4",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-08-19 14:28:19 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Klutz is far and away the best professor",
            "createdByUser": false,
            "date": "2022-04-14 19:46:17 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MDgwMTY2",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36080166,
            "ratingTags": "Amazing lectures --Inspirational--Hilarious",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    },
    {
        "cursor": "YXJyYXljb25uZWN0aW9uOjE5",
        "node": {
            "__typename": "Rating",
            "adminReviewedAt": "2022-08-12 16:28:31 +0000 UTC",
            "attendanceMandatory": "non mandatory",
            "clarityRating": 5,
            "class": "CJ100",
            "comment": "Take this class if you can! All tests are online and open note, I changed my major to criminal justice after taking this class. No final, 3 tests. last test is not cumulative. No homework. Attendance isn't mandatory, but lectures are interesting. If you have the option to take this class do it. ",
            "createdByUser": false,
            "date": "2022-04-13 04:14:17 +0000 UTC",
            "difficultyRating": 1,
            "flagStatus": "UNFLAGGED",
            "grade": "A+",
            "helpfulRating": 5,
            "id": "UmF0aW5nLTM2MDY4MzYx",
            "isForCredit": true,
            "isForOnlineClass": false,
            "legacyId": 36068361,
            "ratingTags": "Amazing lectures --Accessible outside class",
            "teacherNote": null,
            "textbookUse": -1,
            "thumbs": [],
            "thumbsDownTotal": 0,
            "thumbsUpTotal": 0,
            "wouldTakeAgain": 1
        }
    }
] as unknown as ReviewNode[];

function App() {
  const [ courseFilter, setCourseFilter ] = useState("all");
  const [ ratingFilter, setRatingFilter ] = useState("all");
  const [ reviewList, setReviewList ] = useState<ReviewListProps>({} as ReviewListProps);
  const [ courseCodes, setCourseCodes ] = useState<CourseCode[]>([] as CourseCode[]);
  const [ ratingsDistributions, setRatingDistributions ] = useState<RatingDistribution>({} as RatingDistribution);
  const [ nextKey, setNextKey ] = useState(null);
  const ratings = ['r5', 'r4', 'r3', 'r2', 'r1'];

  useEffect(() => {
    const data = json['data']['node'];
    setReviewList({ reviews: REVIEWS, teacherId: data['legacyId']});
    setCourseCodes(data['courseCodes']);
    setRatingDistributions(data['ratingsDistribution']);
    // queryRMP();
  }, [])

  // Make a network request to rmp somewhere here
  const queryRMP = async () => {
    const graphqlObj = ({
      "query": "query TeacherRatingsPageQuery( $id: ID!) { node(id: $id) { __typename ... on Teacher { id legacyId firstName lastName school { legacyId name id } lockStatus ...StickyHeader_teacher ...RatingDistributionWrapper_teacher ...TeacherMetaInfo_teacher ...TeacherInfo_teacher ...TeacherRatingTabs_teacher } id }}fragment StickyHeader_teacher on Teacher { ...HeaderDescription_teacher}fragment RatingDistributionWrapper_teacher on Teacher { ...NoRatingsArea_teacher ratingsDistribution { total ...RatingDistributionChart_ratingsDistribution }}fragment TeacherMetaInfo_teacher on Teacher { legacyId firstName lastName department school { name id }}fragment TeacherInfo_teacher on Teacher { id lastName numRatings ...RatingValue_teacher ...NameTitle_teacher ...TeacherTags_teacher ...NameLink_teacher ...TeacherFeedback_teacher}fragment TeacherRatingTabs_teacher on Teacher { numRatings courseCodes { courseName courseCount } ...RatingsList_teacher ...RatingsFilter_teacher}fragment RatingsList_teacher on Teacher { id legacyId lastName numRatings school { id legacyId name } ...Rating_teacher ...NoRatingsArea_teacher ratings(first: 20) { edges { cursor node { ...Rating_rating id __typename } } pageInfo { hasNextPage endCursor } }}fragment RatingsFilter_teacher on Teacher { courseCodes { courseCount courseName }}fragment Rating_teacher on Teacher { ...RatingFooter_teacher ...RatingSuperHeader_teacher ...ProfessorNoteSection_teacher}fragment NoRatingsArea_teacher on Teacher { lastName}fragment Rating_rating on Rating { comment flagStatus createdByUser teacherNote { id } ...RatingHeader_rating ...RatingValues_rating ...CourseMeta_rating ...RatingTags_rating ...RatingFooter_rating ...ProfessorNoteSection_rating}fragment RatingHeader_rating on Rating { date class helpfulRating clarityRating isForOnlineClass}fragment RatingValues_rating on Rating { helpfulRating clarityRating difficultyRating}fragment CourseMeta_rating on Rating { attendanceMandatory wouldTakeAgain grade textbookUse isForOnlineClass isForCredit}fragment RatingTags_rating on Rating { ratingTags}fragment RatingFooter_rating on Rating { id comment adminReviewedAt flagStatus legacyId thumbsUpTotal thumbsDownTotal thumbs { userId thumbsUp thumbsDown id } teacherNote { id }}fragment ProfessorNoteSection_rating on Rating { teacherNote { ...ProfessorNote_note id } ...ProfessorNoteEditor_rating}fragment ProfessorNote_note on TeacherNotes { comment ...ProfessorNoteHeader_note ...ProfessorNoteFooter_note}fragment ProfessorNoteEditor_rating on Rating { id legacyId class teacherNote { id teacherId comment }}fragment ProfessorNoteHeader_note on TeacherNotes { createdAt updatedAt}fragment ProfessorNoteFooter_note on TeacherNotes { legacyId flagStatus}fragment RatingFooter_teacher on Teacher { id legacyId lockStatus}fragment RatingSuperHeader_teacher on Teacher { firstName lastName legacyId school { name id }}fragment ProfessorNoteSection_teacher on Teacher { ...ProfessorNote_teacher ...ProfessorNoteEditor_teacher}fragment ProfessorNote_teacher on Teacher { ...ProfessorNoteHeader_teacher ...ProfessorNoteFooter_teacher}fragment ProfessorNoteEditor_teacher on Teacher { id}fragment ProfessorNoteHeader_teacher on Teacher { lastName}fragment ProfessorNoteFooter_teacher on Teacher { legacyId}fragment RatingValue_teacher on Teacher { numRatings ...NumRatingsLink_teacher}fragment NameTitle_teacher on Teacher { id firstName lastName department school { legacyId name id } ...TeacherDepartment_teacher ...TeacherBookmark_teacher}fragment TeacherTags_teacher on Teacher { lastName teacherRatingTags { legacyId tagCount tagName id }}fragment NameLink_teacher on Teacher { id legacyId firstName lastName school { name id }}fragment TeacherFeedback_teacher on Teacher { numRatings}fragment TeacherDepartment_teacher on Teacher { department school { legacyId name id }}fragment TeacherBookmark_teacher on Teacher { id}fragment NumRatingsLink_teacher on Teacher { numRatings}fragment RatingDistributionChart_ratingsDistribution on ratingsDistribution { r1 r2 r3 r4 r5}fragment HeaderDescription_teacher on Teacher { id firstName lastName department school { legacyId name id } ...TeacherTitles_teacher ...TeacherBookmark_teacher}fragment TeacherTitles_teacher on Teacher { department school { legacyId name id }}",
      // "variables": {"id": "VGVhY2hlci0xOTY3MjY3"} // Ritchey
      "variables": {"id": "VGVhY2hlci0xNjEwNDQx"} // Douglus(~800 ratings)
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

  const searchQuery = (course: string, rating: string) => {
    // perform a search using profId, course, rating
    // replace nextKey
    // replace reviewList with new results
  }

  const paginationQuery = () => {
    // continue pagination of results in backend using profId, course, rating, & nextKey
    // take newly acquired results and add them to reviewList
    //
  }

  const handleChange = (course?: string, rating?: string) => {
    if(course) setCourseFilter(course);
    if(rating) setRatingFilter(rating);
    searchQuery(course || courseFilter, rating || ratingFilter);
    // queryFilter(event.target.value);
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
              onChange={(e: SelectChangeEvent) => {handleChange(e.target.value)}}
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
              value={ratingFilter}
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
