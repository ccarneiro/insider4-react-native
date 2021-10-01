import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);
  let moviesSave = JSON.parse(myMovies) || [];
  return moviesSave;
}

export async function saveMovie(key, newMovie) {
  const moviesStored = await getMoviesSave(key);

  const hasMovie = moviesStored.some((item) => item.id === newMovie.id);

  if (hasMovie) {
    console.log('ESSE FILME JÁ EXISTE NA SUA LISTA');
    return;
  }

  await AsyncStorage.setItem(key, JSON.stringify([...moviesStored, newMovie]));
  console.log('FILME SALVO COM SUCESSO!');
}

export async function deleteMovie(key, id) {
  const moviesStored = await getMoviesSave(key);
  const movies = moviesStored.filter((item) => item.id !== id);
  await AsyncStorage.setItem(key, JSON.stringify(movies));
  console.log('FILME DELETADO COM SUCESSO!');
  return movies;
}

export async function hasMovie(key, movie) {
  const moviesStored = await getMoviesSave(key);

  return moviesStored.some((item) => item.id === movie.id);
}
