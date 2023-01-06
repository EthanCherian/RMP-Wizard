import Box from "@mui/material/Box/Box";
import Parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

export default function ReviewComment({comment}: {comment: string}) {
    return (
        <Box
          sx={{
            fontSize: '16px',
            textAlign: 'left'
          }}
        >
            {Parse(sanitizeHtml(comment))}
        </Box>
    )
}