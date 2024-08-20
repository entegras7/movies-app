import React from 'react';
import { Typography, Box } from '@mui/material';

export default function EmptyPageMessage(props) {
    const { text } = props

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Typography
                variant="h4"
                sx={{
                    color: 'lightgrey',
                    textAlign: 'center',
                }}
            >
                {text}
            </Typography>
        </Box>
    );
};