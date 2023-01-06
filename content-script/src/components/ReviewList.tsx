import Stack from "@mui/material/Stack/Stack";
import Review, { ReviewProps } from "./Review/Review";
import { FooterProps } from "./Review/ReviewFooter";

type NodeExtraInfo = {
    legacyId: number;
    helpfulRating: number;
    clarityRating: number;
  }

export type ReviewNode = {
    node: Exclude<ReviewProps & NodeExtraInfo, FooterProps['teacherId']>;
}

export type ReviewListProps = {
    reviews: ReviewNode[];
    teacherId: number;
}

export default function ReviewList({ reviews, teacherId }: ReviewListProps) {
    return (
        <Stack spacing={3}>
            {reviews && reviews.map(({node}: ReviewNode, index) => (
                <Review 
                    key={index}
                    {...node}
                    qualityRating={ (node.clarityRating + node.helpfulRating)/2 }
                    teacherId={teacherId}
                    ratingId={node.legacyId}
                />
            ))}
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