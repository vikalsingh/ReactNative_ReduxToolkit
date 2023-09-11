import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {addNowPlayingMovies} from '../utils/moviesSlice';
import { Config } from '../utils/Config';

const useGetCityCoords = ({text}) => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

//   const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);

  const callCityApi = async text => {
    const data = await fetch(
      Config.API_URL +
        'q=' +
        text +
        '&limit=1&appid=' +
        Config.WEATHER_KEY +
        '',
    );
    const res = await data.json();
    // setResponce(res[0]);
    console.log('inner', res);

    // dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(() => {
    // !nowPlayingMovies && getNowPlayingMovies();
    callCityApi(text);
  }, []);
};

export default useGetCityCoords;
