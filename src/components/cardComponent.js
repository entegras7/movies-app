import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CardContent from '@mui/material/CardContent';
import { Typography, styled } from '@mui/material';
import { useFavouriteMovies } from '../context/favouriteMovieContext'

const StyledTypography = styled(Typography)(({ theme }) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
}));

export default function CardComponent(props) {
    const { id, title, date, imgUrl, genres, overview } = props
    const { state, dispatch } = useFavouriteMovies()
    const { favourites } = state;
    const isFavMovie = favourites.find(item => item._id === id)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(`You have copied link to share the movie: ${title}`);
            alert('Share link copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const handleAddToFavourites = () => {
        const movie = {
            _id: id,
            title: title,
            date: date,
            poster_path: imgUrl,
            genres: genres,
            overview: overview
        }
        if (isFavMovie) {
            dispatch({ type: 'REMOVE', payload: movie });
        }
        else {
            dispatch({ type: 'ADD', payload: movie });
        }
    }

    return (
        <Card sx={{
            height: 500, maxWidth: 345, borderRadius: '10px',
            border: '2px solid #ddd',
            boxShadow: 2,

        }}>
            <CardMedia
                component="img"
                height="400"
                image={imgUrl}
                alt={title}
                style={{ width: '100%', height: '300px' }}
            />
            <CardContent>
                <StyledTypography variant="h5" component="div">
                    {title}
                </StyledTypography>
                <Typography gutterBottom variant="h6" component="div">
                    {date}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary">
                    <div style={{ font: "bold" }}>{genres}</div>
                    {overview}
                </StyledTypography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favourites" onClick={handleAddToFavourites}>
                    <FavoriteIcon sx={{ color: isFavMovie ? 'red' : 'inherit' }} />
                </IconButton>
                <IconButton aria-label="share" onClick={handleShare}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}