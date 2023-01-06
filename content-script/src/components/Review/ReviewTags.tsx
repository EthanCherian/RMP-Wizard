import Box from '@mui/material/Box/Box';
import Stack from '@mui/material/Stack/Stack';

import {styled} from '@mui/material/styles';

export type TagProps = {
    ratingTags: string;
}

const Tag = styled(Box)({
    textTransform: 'uppercase',
    borderRadius: '14.5px',
    textAlign: 'center',
    padding: '3px 16px',
    margin: '0px 16px 8px 0px',
    backgroundColor: '#f1f1f1',
    fontWeight: '700',
    fontSize: '14px'
});

export default function ReviewTags({ratingTags}: TagProps) {
    return (
        (ratingTags !== "") ?
            <Stack direction='row'>
                {ratingTags.split('--').map(tag => (
                    <Tag key={tag}>
                        {tag}
                    </Tag>
                ))}
            </Stack>
        :
            null
    )
};