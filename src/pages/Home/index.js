import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from './styles';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import api from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';
import { useNavigation } from '@react-navigation/core';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [bannerMovie, setBannerMovie] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            language: 'pt-BR',
            page: 1,
          },
        }),
      ]);
      if (isActive) {
        setNowMovies(getListMovies(10, nowData.data.results));
        setPopularMovies(getListMovies(5, popularData.data.results));
        setTopMovies(getListMovies(5, topData.data.results));
        setBannerMovie(
          nowData.data.results[randomBanner(nowData.data.results)]
        );
        setLoading(false);
      }
    }
    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  function navigateDetailsPage(item) {
    // console.log({ id: item.id });
    navigation.navigate('Detail', { id: item.id });
  }

  function handleSearchMovie() {
    if (input === '') {
      return;
    }
    navigation.navigate('Search', { name: input });
    setInput('');
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
      <Header title="React Prime" />
      <SearchContainer>
        <Input
          placeholder="Ex Vingadores"
          placeholderTextColor="#ddd"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSearchMovie}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton onPress={() => navigateDetailsPage(bannerMovie)}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`,
            }}
          />
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigatePage={() => navigateDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Populares</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigatePage={() => navigateDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Mais votados</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topMovies}
            renderItem={({ item }) => (
              <SliderItem
                data={item}
                navigatePage={() => navigateDetailsPage(item)}
              />
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </BannerButton>
      </ScrollView>
    </Container>
  );
}

export default Home;
