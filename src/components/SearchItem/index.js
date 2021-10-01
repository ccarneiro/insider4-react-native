import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Banner, Container, Rate, RateContainer, Title } from './styles';

function SearchItem({ data, navigatePage }) {
  function handleDetailMovie() {
    if (!data.release_date) {
      alert('Filme ainda sem data');
      return;
    }
    navigatePage(data);
  }

  return (
    <Container onPress={handleDetailMovie}>
      <Banner
        resizeMethod="resize"
        source={
          data?.poster_path
            ? {
                uri: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
              }
            : require('../../assets/semfoto.png')
        }
      />
      <Title>{data?.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74E" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SearchItem;
