import { useEffect, useState } from 'react';
import { getMovies, searchMovies } from '../services/movieApi'
import { trackPromise } from 'react-promise-tracker';
import TopBar from '../components/topBar'
import RenderMovieCards from './renderMovieCards'
import EmptyPageMessage from '../components/emptyPage'
import './styles.css';

const defaultPageSize = 41
const defaultLazyLoadState = {
    hasMore: true,
    page: 1,
    isPageLoading: false
}

export default function HomePage() {
    const [data, setData] = useState([])
    const [lazyLoadState, setLazyLoadState] = useState(defaultLazyLoadState)

    useEffect(() => {
        trackPromise(loadMovies())
    }, [])

    useEffect(() => {
        if (lazyLoadState.page > 1) {
            trackPromise(loadMoreMovies())
        }
    }, [lazyLoadState.page])

    const loadMovies = async () => {
        const data = await getMovies(null)
        setData(data.movies)
    }

    const loadMoreMovies = async () => {
        const page = lazyLoadState.page
        const updatedData = await getMovies(page)
        const newMovies = [...data, ...updatedData.movies]
        setData([...newMovies])
        setLazyLoadState({ ...lazyLoadState, hasMore: updatedData.movies.length >= defaultPageSize, isPageLoading: false })
    }

    const handleSearch = async (value) => {
        console.log(value.length)
        if (value.length > 0) {
            const searchedResult = await searchMovies(value)
            if (searchedResult.contents) setData(searchedResult.contents)
        }
        else {
            const data = await getMovies(null)
            if (data.movies) setData(data.movies)
        }
    }

    return (
        <div className="homeContainer">
            <TopBar handleSearch={handleSearch} />
            {data.length > 0
                ? <RenderMovieCards
                    movies={data}
                    enableLazyLoading={true}
                    defaultPageSize={defaultPageSize}
                    lazyLoadState={lazyLoadState}
                    setLazyLoadState={setLazyLoadState} />
                : <EmptyPageMessage text={'No movies to show.'} />}
        </div>
    )
}