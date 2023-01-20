import Box from '@mui/material/Box/Box';
import Stack from '@mui/material/Stack/Stack';
import Typography from '@mui/material/Typography/Typography';

import {green, yellow, red} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import { RatingProps } from '../../types/ReviewTypes';

type QualityProp = {
    qualityRating: number;
}

type DifficultyProp = {
    difficultyRating: number;
}

const NumberBox = styled(Box)({
    width: '72px',
    height: '64px',
    fontWeight: '900',
    fontFamily: 'Poppins, sans-serif;',
    fontSize: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
});

const QualityBox = ({qualityRating: quality}: QualityProp) => {
    const qualityColor = (quality > 3.5) ? green[200]: ((quality > 2.5) ? yellow[200]: red[200]);
    return (
        <NumberBox sx={{ backgroundColor: qualityColor }}>
            {quality.toFixed(1)}
        </NumberBox>
    )
}

const DifficultyBox = ({difficultyRating: difficulty}: DifficultyProp) => {
    return (
    <NumberBox sx={{ backgroundColor: '#e4e4e4' }}>
        {difficulty.toFixed(1)}
    </NumberBox>
    )
}

export default function ReviewValues({qualityRating: quality, difficultyRating: difficulty}: RatingProps) {
    return (
        <Stack spacing={3.5} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ textTransform: 'uppercase', fontSize: '14px', fontWeight: 'bold' }}>Quality</Box>
                <QualityBox qualityRating={quality}/>
            </Typography>
            <Typography component='div' sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ textTransform: 'uppercase', fontSize: '14px', fontWeight: 'bold' }}>Difficulty</Box>
                <DifficultyBox difficultyRating={difficulty} />
            </Typography>
        </Stack>
    )
}