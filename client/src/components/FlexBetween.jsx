import { Box } from '@mui/material';
import { styled } from '@mui/system';

const FlexBetween = styled(Box)({ // reusing css styles, essentially creating own elements
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;