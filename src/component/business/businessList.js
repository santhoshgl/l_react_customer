import React, { memo } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors } from '@constants';
import BusinessCard from './card';
import { useNavigation } from '@react-navigation/native';

const BusinessList = ({ title, item }) => {
  const navigation = useNavigation()
  return (
    <View marginT-8 >
      <View paddingH-16 row spread centerV >
        <Text beb24 lh32 black flex numberOfLines={1} >{title || ''}</Text>
        <Pressable hitSlop={10} onPress={() => navigation.navigate('businessList', { title, item, source: 'businesses' })}>
          {(item == null || item?.length == 1) ?
            <Text></Text> : <Text fs14M lh20 primary700 >See all</Text>
          }
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={item || []}
        renderItem={({ item }) => <BusinessCard item={item} />}
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}
      />
      <View style={styles.separator} />
    </View>
  );
}

export default memo(BusinessList)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})