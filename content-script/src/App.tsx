/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import './App.css';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useState, useEffect } from 'react';
import ReviewList from './components/ReviewList';
import { ReviewElement, ReviewRMP } from '../types/ReviewTypes';

type CourseCode = {
  courseCount: number;
  courseName: string;
};

type RatingDistribution = {
  r5: number;
  r4: number;
  r3: number;
  r2: number;
  r1: number;
  total: number;
};

const json = {
  data: {
      node: {
          courseCodes: [
              {
                  courseCount: 6,
                  courseName: "100"
              },
              {
                  courseCount: 1,
                  courseName: "43753"
              },
              {
                  courseCount: 624,
                  courseName: "CJ100"
              },
              {
                  courseCount: 10,
                  courseName: "CJ100001"
              },
              {
                  courseCount: 5,
                  courseName: "CJ100320"
              },
              {
                  courseCount: 26,
                  courseName: "CJ101"
              },
              {
                  courseCount: 1,
                  courseName: "CJ10110"
              },
              {
                  courseCount: 13,
                  courseName: "CJ220"
              },
              {
                  courseCount: 1,
                  courseName: "CJ250"
              },
              {
                  courseCount: 9,
                  courseName: "CJ300"
              },
              {
                  courseCount: 62,
                  courseName: "CJ395"
              },
              {
                  courseCount: 1,
                  courseName: "CJ483"
              },
              {
                  courseCount: 33,
                  courseName: "CJ490"
              },
              {
                  courseCount: 1,
                  courseName: "CRIM100"
              },
              {
                  courseCount: 1,
                  courseName: "CRIM101"
              },
              {
                  courseCount: 1,
                  courseName: "CRM100"
              },
              {
                  courseCount: 1,
                  courseName: "EDM260"
              }
          ],
          department: "Criminal Justice",
          firstName: "Douglas",
          id: "VGVhY2hlci0xNjEwNDQx",
          lastName: "Klutz",
          legacyId: 1610441,
          numRatings: 796,
          ratingsDistribution: {
              r1: 0,
              r2: 0,
              r3: 2,
              r4: 6,
              r5: 788,
              total: 796
          },
      }
  }
};

const REVIEWS = [
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjA=",
        node: {
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "This was by far the easiest class I took. The tests can be taken anywhere, I always just did them in my room. All the notes are posted on blackboard and there is no homework. I got an A+ and almost never went to class. He always shared really interesting topics and was a great speaker. He's also a dilf. ",
            date: "2023-01-12 22:55:54 +0000 UTC",
            difficultyRating: 1,
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MzI3MjI3",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37327227,
            ratingTags: "Hilarious--Respected--Accessible outside class",
            textbookUse: -1,
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "By far my favorite class of last semester. 3 tests that are very upfront and align with the notes given in class. Most definitely would take his class again!",
            createdByUser: false,
            date: "2023-01-12 04:02:37 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MzIzMzY3",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37323367,
            ratingTags: "Clear grading criteria--Hilarious--Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjI=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 3,
            class: "100",
            comment: "He is overall an amazing professor but beware the class is m aade of 3 test. If you do poorly on one test, you are not aloud to retake and are almost guarantied of not finishing with an A. ",
            createdByUser: false,
            date: "2022-12-30 05:48:09 +0000 UTC",
            difficultyRating: 2,
            flagStatus: "UNFLAGGED",
            grade: "B+",
            helpfulRating: 3,
            id: "UmF0aW5nLTM3MjYyOTY1",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37262965,
            ratingTags: "Hilarious--Graded by few things--Accessible outside class",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjM=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "The grade is entirely made up of the tests which are open note. While attendance is not mandatory or necessary to pass the class, I recommend going to lecture as often as you can because Klutz is the most interesting man to listen to. Thoroughly enjoyed his class 10/10.",
            createdByUser: false,
            date: "2022-12-20 04:12:24 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MTk4Mjgz",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37198283,
            ratingTags: "Amazing lectures --Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjQ=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Klutz is a great professor. Gives amazing lectures that are always engaging. You don't technically have to go to class as he posts all the powerpoints, but I would recommend it as it is always super interesting. Tests are very easy. He is very caring and willing to answer questions about class or anything CJ related. Take him!",
            createdByUser: false,
            date: "2022-12-19 21:41:58 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MTkyOTEw",
            isForCredit: false,
            isForOnlineClass: false,
            legacyId: 37192910,
            ratingTags: "Caring--Respected--Accessible outside class",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjU=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Klutz is the most kind professor I have ever had. His lectures are amazing and very engaging. I was never bored in class and looked forward to always going. He responds to emails so fast and is so clear. Gave free extra credit at end of semester and rounds everyone's grades. If you want to take CJ take Klutz! If his class is full he is worth wait",
            createdByUser: false,
            date: "2022-12-08 18:39:53 +0000 UTC",
            difficultyRating: 2,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MDMxOTEw",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37031910,
            ratingTags: "Amazing lectures --Clear grading criteria--Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjY=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Best professor ever. His lectures were so engaging and easy to follow. Attendance is not mandatory but I recommend going because you can learn so much from him. Grades are based on 3 tests that he reviews very clearly before each test. He is super nice and always wants to help his students out.",
            createdByUser: false,
            date: "2022-12-07 17:15:11 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM3MDA3NDgz",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 37007483,
            ratingTags: "Amazing lectures --Clear grading criteria--Caring",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjc=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Best teacher ever. Attendance is not required and your overall grade is only based on three tests. If you pay attention to the power points, you will have all the answers.",
            createdByUser: false,
            date: "2022-11-17 17:59:34 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2ODU1MzQx",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36855341,
            ratingTags: "Amazing lectures --Gives good feedback--Graded by few things",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjg=",
        node: {
            __typename: "Rating",
            adminReviewedAt: null,
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Great professor. Brings in real-life examples and is clear when teaching tough subjects. Tests can be taken wherever you want and they are multiple-choice. You can download the presentations in Power Point, no need to go to class.",
            createdByUser: false,
            date: "2022-11-11 02:10:55 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2ODE1MzAy",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36815302,
            ratingTags: "Amazing lectures --Hilarious--Caring",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjk=",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2023-01-04 16:42:57 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "100",
            comment: "Amazing professor to have for CJ 100.",
            createdByUser: false,
            date: "2022-10-21 21:27:07 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2NzI0NTcw",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36724570,
            ratingTags: "",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjEw",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-12-27 01:45:54 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "He is awesome!  Everyone should take his class.  4 tests on material covered in class.  Test were online even though it was an in person class. Lecture notes sent to you after each class so you can really pay attention to him speaking. Take him...you won't be sorry.",
            createdByUser: false,
            date: "2022-08-18 01:54:02 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2NTk0MDQ1",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36594045,
            ratingTags: "Clear grading criteria--Caring--Graded by few things",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjEx",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-11-28 22:23:37 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "This class consisted of 3 tests.  His lecture notes are all online and tests are taken during regular class time at home online. No proctoring fee. Take him!  You won't be sorry.  Very easy class and minimal time needed to spend on it. ",
            createdByUser: false,
            date: "2022-06-13 18:13:56 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2NDYwNTU1",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36460555,
            ratingTags: "Clear grading criteria--Respected--Graded by few things",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjEy",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-11-16 21:51:11 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "One of my Favorite teachers at the University! His lectures are not mandatory but, I highly recommend attending them they are very interesting and easy to understand.",
            createdByUser: false,
            date: "2022-05-25 16:13:41 +0000 UTC",
            difficultyRating: 2,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2NDA0OTE0",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36404914,
            ratingTags: "Caring--Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjEz",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-10-18 20:18:00 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Attendance is not required. Only grades are 3 tests that are taken online. Super easy.",
            createdByUser: false,
            date: "2022-05-09 15:51:05 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2Mjg1NTE3",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36285517,
            ratingTags: "Caring--Graded by few things--Accessible outside class",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE0",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-09-29 21:00:03 +0000 UTC",
            attendanceMandatory: "N",
            clarityRating: 5,
            class: "CJ100",
            comment: "Loved this class so much I decided to make criminal justice my minor. Klutz just has a way of making his lectures feel like conversations, I would take any class he teaches!",
            createdByUser: false,
            date: "2022-05-04 15:05:33 +0000 UTC",
            difficultyRating: 3,
            flagStatus: "UNFLAGGED",
            grade: "",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MjM4MzU0",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36238354,
            ratingTags: "Amazing lectures",
            teacherNote: null,
            textbookUse: 0,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE1",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-09-26 02:26:11 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "My fav professor at UA. A genuinely knowledgable and kind guy. Will literally help you out with anything. His lectures are super interesting. im not a CJ major but I enjoyed his class more than my major courses. I recommend going to every class and being engaged because you will gain so much from him. ",
            createdByUser: false,
            date: "2022-05-03 14:40:44 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MjI1MTQ5",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36225149,
            ratingTags: "Amazing lectures --Inspirational--Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE2",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-08-26 18:34:36 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Professor Klutz is so wise and knows what he's talking about. He knows how to explain the material in a way to make all of his students understand. His Lectures are the best, not only does he make his lectures fun and interesting but also relatable to his students lives as college students and the importance of knowing our rights! Highly recommend!",
            createdByUser: false,
            date: "2022-04-19 15:21:08 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MTAyMDY3",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36102067,
            ratingTags: "Amazing lectures --Hilarious--Respected",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE3",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-08-18 21:16:04 +0000 UTC",
            attendanceMandatory: "",
            clarityRating: 5,
            class: "CJ100",
            comment: "It was a very easy class that was also very informative and interesting. Whether it's your major/minor, or you just need an extra class, I would highly recommend him. ",
            createdByUser: false,
            date: "2022-04-14 23:47:57 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MDgxODU0",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36081854,
            ratingTags: "",
            teacherNote: null,
            textbookUse: null,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE4",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-08-19 14:28:19 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Klutz is far and away the best professor",
            createdByUser: false,
            date: "2022-04-14 19:46:17 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MDgwMTY2",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36080166,
            ratingTags: "Amazing lectures --Inspirational--Hilarious",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    },
    {
        cursor: "YXJyYXljb25uZWN0aW9uOjE5",
        node: {
            __typename: "Rating",
            adminReviewedAt: "2022-08-12 16:28:31 +0000 UTC",
            attendanceMandatory: "non mandatory",
            clarityRating: 5,
            class: "CJ100",
            comment: "Take this class if you can! All tests are online and open note, I changed my major to criminal justice after taking this class. No final, 3 tests. last test is not cumulative. No homework. Attendance isn't mandatory, but lectures are interesting. If you have the option to take this class do it. ",
            createdByUser: false,
            date: "2022-04-13 04:14:17 +0000 UTC",
            difficultyRating: 1,
            flagStatus: "UNFLAGGED",
            grade: "A+",
            helpfulRating: 5,
            id: "UmF0aW5nLTM2MDY4MzYx",
            isForCredit: true,
            isForOnlineClass: false,
            legacyId: 36068361,
            ratingTags: "Amazing lectures --Accessible outside class",
            teacherNote: null,
            textbookUse: -1,
            thumbs: [],
            thumbsDownTotal: 0,
            thumbsUpTotal: 0,
            wouldTakeAgain: 1
        }
    }
] as unknown as ReviewRMP[];

const getCursorIdHelper = () => {
    const script = document.evaluate(
            "//script[contains(text(), 'window.__RELAY_STORE__')]", 
            document, 
            null, 
            XPathResult.FIRST_ORDERED_NODE_TYPE, 
            null
        );
    if(script) {
        const scriptText = (script.singleNodeValue!.textContent)!;
        const regexToGetID = /\}\},"(.*?)"/gm;
        return regexToGetID.exec(scriptText)![1];
    }
}

function App() {
  const teacherId = Number("something/tid=609101".match(/\d+/));
  //   const teacherId = Number((window.location.toString()).match(/\d+/));
  const cursorId = "VGVhY2hlci02MDkxMDE=";
//   const cursorId = getCursorIdHelper();
  const [ courseFilter, setCourseFilter ] = useState("all");
  const [ ratingFilter, setRatingFilter ] = useState("all");
  const [ reviewList, setReviewList ] = useState<ReviewElement[]>([] as ReviewElement[]);
  const [ courseCodes, setCourseCodes ] = useState<CourseCode[]>([] as CourseCode[]);
  const [ ratingsDistributions, setRatingDistributions ] = useState<RatingDistribution>({} as RatingDistribution);
  const [ nextKey, setNextKey ] = useState(null);
  const ratings = ['r5', 'r4', 'r3', 'r2', 'r1'];

  useEffect(() => {
    // call searchQuery with courseFilter & ratingFilter as args

    // const data = json['data']['node'];
    // setReviewList(REVIEWS);
    // setCourseCodes(data['courseCodes']);
    // setRatingDistributions(data['ratingsDistribution']);
    // getCursorIdHelper();
    initialQuery();
  }, []);

  // INSTEAD, initialQuery & reviewQuery
  // initialQuery is done on page load and just passes in the professorId(number) and cursor(string)
  // reviewQuery handles dropdown changes and pagination

  const initialQuery = () => {
    // Handle the initial page load and/or first 20 results

    // perform a search using profId, cursor, course, rating
    // replace nextKey
    // replace reviewList with new results
    return fetch("https://5vlsyphbad.execute-api.us-east-2.amazonaws.com/prof", {
          method: "POST",
          body: JSON.stringify({ profId: teacherId, cursor: cursorId })
      })
      .then(res => res.json())
      .then(json => {
        setCourseCodes(json['Details']['Courses']);
        setRatingDistributions(json['Details']['Ratings']);
        setReviewList(json['Reviews']);
        setNextKey(json['NextKey']);
      });
  }

  const reviewQuery = (course: string, rating: string, filterChanged?: boolean) => {
    // continue pagination of results in backend using profId, course, rating, & nextKey
    // take newly acquired results and add them to reviewList
    
    return fetch("https://5vlsyphbad.execute-api.us-east-2.amazonaws.com/", {
      method: "POST",
      body: JSON.stringify({
        profId: teacherId,
        course: (course === "all") ? "": course,
        rating: (rating === "all") ? "": rating,
        startKey: (filterChanged) ? null : nextKey
      })
    })
    .then(res => res.json())
    .then(json => {
      setReviewList(
        (filterChanged)
          ? json['Items']
          : reviewList.concat(json['Items'])
      );
      setNextKey(json['LastEvaluatedKey']);
    });
  }

  const handleChange = (course?: string, rating?: string) => {
    if(course) setCourseFilter(course);
    if(rating) setRatingFilter(rating);
    reviewQuery(course || courseFilter, rating || ratingFilter, true);
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
                  {course.courseName} {ratingFilter === "all" && `(${course.courseCount})`}
                </MenuItem>
              ))}
                
            </Select>
          </FormControl>
          <FormControl size='small'>
            <Select
              value={ratingFilter}
              onChange={(e: SelectChangeEvent) => {handleChange(undefined, e.target.value)}}
              >
              <MenuItem value="all">All Ratings</MenuItem>
              {ratingsDistributions && ratings.map((rating: string) => {
                const ratingCount = ratingsDistributions[rating as keyof RatingDistribution];
                return (ratingCount > 0) ? 
                  <MenuItem key={rating} value={rating}>
                    {rating} {courseFilter === "all" && `(${ratingCount})`}
                  </MenuItem> 
                  : 
                  null
              })}
            </Select>
          </FormControl>
        </Stack>
        <ReviewList reviews={reviewList} teacherId={teacherId} />
        {nextKey && (<Button onClick={() => {reviewQuery(courseFilter, ratingFilter, )}}> Load More </Button>)}
      </Stack>
    </Stack>
  );
}

export default App;
