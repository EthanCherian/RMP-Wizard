import Paper from '@mui/material/Paper/Paper';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';
import ReviewFooter from './ReviewFooter';
import ReviewHeader from './ReviewHeader';
import ReviewInfo from './ReviewInfo';
import ReviewTags from './ReviewTags';
import ReviewValues from './ReviewValues';
import ReviewComment from './ReviewComment';
import { ReviewProps } from '../../types/ReviewTypes';

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