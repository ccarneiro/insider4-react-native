import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
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
import { getListMovies } from '../../utils/movie';

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      // const response = await api.get('/movie/now_playing', {
      //   params: {
      //     language: 'pt-BR',
      //     page: 1,
      //   },
      // });

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

      setNowMovies(getListMovies(10, nowData.data.results));
      setPopularMovies(getListMovies(5, popularData.data.results));
      setTopMovies(getListMovies(5, topData.data.results));
    }
    getMovies();
  }, []);

  return (
    <Container>
      <Header title="React Prime" />
      <SearchContainer>
        <Input placeholder="Ex Vingadores" placeholderTextColor="#ddd" />
        <SearchButton>
          <Feather name="search" size={30} color="#fff" />
        </SearchButton>
      </SearchContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton onPress={() => {}}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80',
            }}
          />
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={nowMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Populares</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={popularMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />

          <Title>Mais votados</Title>
          <SliderMovie
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={topMovies}
            renderItem={({ item }) => <SliderItem data={item} />}
            keyExtractor={(item) => String(item.id)}
          />
        </BannerButton>
      </ScrollView>
    </Container>
  );
}

export default Home;
