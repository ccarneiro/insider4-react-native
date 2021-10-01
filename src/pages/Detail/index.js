import React, { useEffect, useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import Stars from 'react-native-stars';
import {
  Banner,
  Container,
  ContentArea,
  Description,
  Header,
  HeaderButton,
  LinkButton,
  ListGenres,
  Rate,
  Title,
} from './styles';

import api from '../../services/api';
import Genres from '../../components/Genres';
import ModalLink from '../../components/ModalLink';
import { hasMovie, saveMovie, deleteMovie } from '../../utils/storage';

function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);
  const [favoriteMovie, setFavoriteMovie] = useState(false);

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController();

    async function getMovie() {
      const response = await api
        .get(`/movie/${route.params?.id}`, { params: { language: 'pt-BR' } })
        .catch((err) =>
          console.log('Erro ao tentar recuperar informações do filme', err)
        );
      if (isActive) {
        setMovie(response.data);
        const isFavorite = await hasMovie('@primereact', response.data);
        setFavoriteMovie(isFavorite);
      }
    }

    getMovie();
    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);

  async function handleFavoriteMovie(movie) {
    if (favoriteMovie) {
      await deleteMovie('@primereact', movie.id);
      setFavoriteMovie(false);
      return;
    }
    await saveMovie('@primereact', movie);
    setFavoriteMovie(true);
  }

  return (
    <Container>
      <Header>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#fff" />
        </HeaderButton>
        <HeaderButton onPress={() => handleFavoriteMovie(movie)}>
          <Ionicons
            name={favoriteMovie ? 'bookmark' : 'bookmark-outline'}
            size={28}
            color="#fff"
          />
        </HeaderButton>
      </Header>
      <Banner
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
      />
      <LinkButton onPress={() => setOpenLink(true)} disabled={!movie?.homepage}>
        <Feather name="link" size={28} color="#fff" />
      </LinkButton>

      <Title numberOfLines={2}>{movie.title}</Title>
      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
          emptyStar={
            <Ionicons name="md-star-outline" size={24} color="#E7A74E" />
          }
          halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
          disable={true}
        />
        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>
      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Genres data={item} />}
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <Title>Descrição</Title>
        <Description>{movie?.overview}</Description>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </Container>
  );
}

export default Detail;
