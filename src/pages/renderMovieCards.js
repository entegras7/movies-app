import React, { useRef } from 'react'
import { Grid } from '@mui/material';
import CardComponent from '../components/cardComponent'

export default function RenderMovieCards(props) {
    const { movies, enableLazyLoading = false, defaultPageSize, lazyLoadState, setLazyLoadState } = props
    const observer = useRef()

    const lastListElementRef = (node) => {
        if (enableLazyLoading) {
            if (lazyLoadState.isPageLoading) return;
            if (observer.current)
                observer.current.disconnect()
            observer.current = new IntersectionObserver(handleObservation);
            if (node) {
                observer.current.observe(node)
            }
        }
    }

    const handleObservation = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && lazyLoadState.hasMore) {
            setLazyLoadState({ ...lazyLoadState, isPageLoading: true, page: lazyLoadState.page + 1 })
        }
    }

    return (
        <Grid container spacing={3}>
            {movies && movies.map((movie, index) => {
                return (
                    <Grid item xs={6} sm={4} md={2} key={index} >
                        <CardComponent
                            key={movie._id}
                            id={movie._id}
                            title={movie.title}
                            date={movie.release_date}
                            imgUrl={movie.poster_path}
                            genres={movie.genres}
                            overview={movie.overview}
                        />
                    </Grid>
                )
            })}
            {enableLazyLoading && movies.length < defaultPageSize ? null : <div ref={lastListElementRef}></div>}
        </Grid>

    )
}