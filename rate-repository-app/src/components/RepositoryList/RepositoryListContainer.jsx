import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';

import { RepositoryListPicker } from './RepositoryListPicker';
import RepositoryItem from '../RepositoryItem';
import { useState } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories, orderBy, setOrderBy, setOrderDirection }) => {
  const [buttonLabel, setButtonLabel] = useState('Latest repositories');

  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/${item.id}`)}>
          <RepositoryItem item={item} key={item.id} />
        </Pressable>
      )}
      ListHeaderComponent={() => (
      <RepositoryListPicker
        buttonLabel={buttonLabel}
        setButtonLabel={setButtonLabel}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    )}
    />
  );
};

export { RepositoryListContainer, ItemSeparator };