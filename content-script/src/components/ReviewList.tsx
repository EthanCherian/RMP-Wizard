import Stack from "@mui/material/Stack/Stack";
import Review from "./Review/Review";
import { ReviewPlus, ReviewRMP, ReviewElement } from "../../types/ReviewTypes";

const areReviewsRMP = (reviews: ReviewElement[]): reviews is ReviewRMP[] => {
    return reviews[0].hasOwnProperty('node');
}

const areReviewsPlus = (reviews: ReviewElement[]): reviews is ReviewPlus[] => {
    return reviews[0].hasOwnProperty('qualityRating');
}

function determineReturn(reviews: ReviewElement[], teacherId: number) {
    if(areReviewsRMP(reviews)){
        return (
            reviews.map(({node}: ReviewRMP, index) => (
                <Review 
                    key={index}
                    {...node}
                    qualityRating={ (node.clarityRating + node.helpfulRating)/2 }
                    teacherId={teacherId}
                    ratingId={node.legacyId}
                />
            ))
        );
    } else if(areReviewsPlus(reviews)){
        return (
            reviews.map((review: ReviewPlus, index) => (
                <Review 
                    key={index}
                    {...review}
                    qualityRating={ parseFloat(review.qualityRating) }
                    teacherId={teacherId}
                    ratingId={review.Id}
                />
            ))
        )
    }
}

export default function ReviewList({ reviews, teacherId }: { reviews: ReviewElement[], teacherId: number }) {
    return (
        <Stack spacing={3}>
            {(reviews && reviews.length) && determineReturn(reviews, teacherId)}
            {/* <Review {...{
                qualityRating: 5.0,
                difficultyRating: 2.5,
                class: 'CSCE221',
                date: '2022-12-15',
                isForCredit: true, 
                attendanceMandatory: 'Not Mandatory', 
                wouldTakeAgain: 1, 
                grade: 'A-', 
                textbookUse: 0, 
                isForOnlineClass: false,
                comment: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quidem dignissimos hic, corrupti veniam natus excepturi quisquam qui in labore atque aut officia quam, quod iusto fugiat beatae, rerum nemo?',
                ratingTags: 'Lots of Homework--Clear Grading Criteria--Tough Grader',
                thumbsUpTotal: 2,
                thumbsDownTotal: 0,
                teacherId: 87942,
                ratingId: 297247
            }}/> */}
        </Stack>
    )
}