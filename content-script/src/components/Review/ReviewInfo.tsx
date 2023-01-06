import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";

export type ReviewInfoProps = {
    isForCredit?: boolean;
    attendanceMandatory?: string;
    wouldTakeAgain?: number;
    grade?: string;
    textbookUse?: number;
    isForOnlineClass?: boolean;
}

type StyledInfoProps = {
    info: string;
    val: string;
}

const StyledInfoBox = ({ info, val }: StyledInfoProps) => {
    return (
        <Box fontSize='16px'>
            {`${info}: `} 
            <Box component='span' fontWeight='700'>{val}</Box>
        </Box>
    )
}

export default function ReviewInfo(info: ReviewInfoProps) {
    return (
        <Stack direction='row' spacing={2} display='flex' sx={{ flexFlow: 'wrap'}} textTransform='capitalize'>
            {info.isForCredit && <StyledInfoBox info='For Credit' val='Yes'/>}
            {info.attendanceMandatory && <StyledInfoBox info='Attendance' val={ info.attendanceMandatory } />}
            {info.wouldTakeAgain && <StyledInfoBox info='Would Take Again' val={(info.wouldTakeAgain) ? "Yes": "No"} />}
            {info.grade && <StyledInfoBox info='Grade' val={ info.grade } />}
            {(info.textbookUse || info.textbookUse === 0) &&
                <StyledInfoBox info='Textbook' val={(info.textbookUse === -1) ? "N/A": ((info.textbookUse > 0) ? "Yes": "No")} />
            }
            {info.isForOnlineClass && <StyledInfoBox info='Online Class' val='Yes' />}
        </Stack>
    )
}