import Stack from '@mui/material/Stack/Stack';
import Box from '@mui/material/Box/Box';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { FooterProps } from '../../types/ReviewTypes';

export default function ReviewFooter(props: FooterProps) {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row' spacing={2}>
                <Box>
                    <ThumbUpOutlinedIcon />
                    {props.thumbsUpTotal}
                </Box>
                <Box>
                    <ThumbDownOutlinedIcon />
                    {props.thumbsDownTotal}
                </Box>
            </Stack>
            <Box sx={{ '&:hover': { cursor: 'pointer' } }}>
                <OutlinedFlagIcon onClick={event => window.location.href=`https://www.ratemyprofessors.com/flag/professor-rating?tid=${props.teacherId}&rid=${props.ratingId}`}/>
            </Box>
        </Stack>
    )
}