import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import FavoriteItem from '../../components/FavoriteItem';
import Header from '../../components/Header';
import { deleteMovie, getMoviesSave } from '../../utils/storage';
import { Container, ListMovies } from './styles';

function Movie() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState();

  useEffect(() => {
    let isActive = true;
    let ac = new AbortController();

    async function getFavoriteMovies() {
      const storedMovies = await getMoviesSave('@primereact');
      if (isActive) {
        setMovies(storedMovies);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovie('@primereact', id);
    setMovies(result);
  }

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { id: item?.id });
  }

  return (
    <Container>
      <Header title="Meus filmes" />
      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movie;
