import React from 'react';
import { View, Text } from 'react-native';
import { Container, MenuButton, Title } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

function Header({ title }) {
  const navigation = useNavigation();
  return (
    <Container>
      <MenuButton onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={33} color="#fff" />
      </MenuButton>
      <Title>{title}</Title>
    </Container>
  );
}

export default Header;
