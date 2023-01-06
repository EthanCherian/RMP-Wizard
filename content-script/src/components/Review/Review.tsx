import Paper from '@mui/material/Paper/Paper';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import ReviewFooter, { FooterProps } from './ReviewFooter';
import ReviewHeader, { HeaderProps } from './ReviewHeader';
import ReviewInfo from './ReviewInfo';
import ReviewTags, { TagProps } from './ReviewTags';
import ReviewValues, { RatingProps } from './ReviewValues';
import { ReviewInfoProps } from './ReviewInfo';
import ReviewComment from './ReviewComment';

type Comment = {
    comment: string;
}

export type ReviewProps = RatingProps & HeaderProps & ReviewInfoProps & FooterProps & TagProps & Comment;

export default function Review(review: ReviewProps) {

    // NOTE: Spread syntax used extensively here could hurt performance, should probably refactor
    return (
        <Paper>
            <Stack direction='row' spacing={6} sx={{mt: 3, mx: 3, pb: 2}}>
                <ReviewValues 
                  qualityRating={review.qualityRating} 
                  difficultyRating={review.difficultyRating}
                />
                <Typography component='div'>
                    <Stack spacing={3}>
                        <ReviewHeader 
                          class={review.class}
                          date={review.date}
                          qualityRating={review.qualityRating}
                        />
                        <ReviewInfo {...review}/>
                        <ReviewComment comment={review.comment}/>
                        <ReviewTags ratingTags={review.ratingTags}/>
                        <ReviewFooter 
                          thumbsUpTotal={review.thumbsUpTotal}
                          thumbsDownTotal={review.thumbsDownTotal}
                          teacherId={review.teacherId}
                          ratingId={review.ratingId}
                        />
                    </Stack>
                </Typography>
            </Stack>
        </Paper>
    )
}