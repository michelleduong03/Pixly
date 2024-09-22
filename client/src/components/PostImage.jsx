import { Box } from '@mui/material';

const PostImage = ({ image, size = "100%" }) => {
    return (
        <Box width={size} height="auto">
            <img 
                style={{ objectFit: "cover", borderRadius: "0.75rem" }}
                width={size}
                height="auto"
                alt="post"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    );
}

export default PostImage;
