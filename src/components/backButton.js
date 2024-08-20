import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ text = "Back to Home Page" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            onClick={handleClick}
            sx={{ cursor: 'pointer', mb: 2 }}
        >
            <IconButton color="primary">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 1,color:'white' }}>
                {text}
            </Typography>
        </Box>
    );
};

