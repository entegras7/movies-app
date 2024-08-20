import BackButton from '../components/backButton'
import { useFavouriteMovies } from '../context/favouriteMovieContext'
import RenderMovieCards from './renderMovieCards'
import EmptyPageMessage from '../components/emptyPage'
import './styles.css';

export default function FavouriteMoviePage() {
    const { state } = useFavouriteMovies()
    const { favourites } = state;

    console.log(favourites)
    return (
        <div className="favPageContainer">
            <BackButton />
            {favourites.length > 0 ? <RenderMovieCards movies={favourites} />
                : <EmptyPageMessage text={'You are yet to add movies to favourites'} />}
        </div>
    )
}