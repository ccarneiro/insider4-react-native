import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Container, ListMovies } from './styles';
import { ActivityIndicator } from 'react-native';
import api from '../../services/api';
import SearchItem from '../../components/SearchItem';

function Search() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getSearchMovies() {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          language: 'pt-BR',
          page: 1,
        },
      });

      if (isActive) {
        // console.log(response.data?.results.length);
        setMovies(response.data?.results);
        setLoading(false);
      }
    }

    if (isActive) {
      getSearchMovies();
    }

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id });
  }

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#fff" />
      </Container>
    );
  }

  return (
    <Container>
      <ListMovies
        data={movies}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <SearchItem
            data={item}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Search;
