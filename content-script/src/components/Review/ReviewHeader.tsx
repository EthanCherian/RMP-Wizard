import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";

import {green, yellow, red} from '@mui/material/colors';

import dayjs from 'dayjs';

export type HeaderProps = {
    class: string;
    date: string;
} & QualityProp;

type QualityProp = {
    qualityRating: number;
}

const EmotionBox = ({qualityRating: quality}: QualityProp) => {
    let emotionColor = '', emotionText = ''; 
    if(quality > 3.5){
        emotionColor = green[200];
        emotionText = 'awesome';
    } else if(quality > 2.5) {
        emotionColor = yellow[200];
        emotionText = 'average';
    } else{
        emotionColor = red[200];
        emotionText = 'awful';
    }
    return (
        <Box sx={{
            textTransform: 'uppercase',
            backgroundColor: emotionColor,
            padding: '5px 20px',
            fontWeight: 700
        }}>
            {emotionText}
        </Box>
    )
}

export default function ReviewHeader(props: HeaderProps) {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' spacing={2}>
                <Box alignSelf='center' fontWeight={900}>{props.class}</Box>
                <EmotionBox qualityRating={props.qualityRating} />
            </Stack>
            <Box fontWeight={900}>
                {dayjs(props.date, 'YYYY-MM-DD HH-mm-ss Z UTC').format('MMM D, YYYY')}
            </Box>
        </Stack>
    )
}