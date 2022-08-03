import React, { memo, useEffect } from 'react';
import { SafeAreaView, Image, Pressable, FlatList, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native-ui-lib';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import BusinessList from '@component/business/businessList';
import { Colors, Images } from '@constants';
import { getBusiness } from '../../redux/reducer/business';
import { useMemo } from 'react';

const Business = ({ navigation }) => {
  const dispatch = useDispatch()
  const { defaultHub } = useSelector(s => s.user)
  const { businessData } = useSelector(s => s.business)

  useEffect(() => {
    if (defaultHub?.id) {
      dispatch(getBusiness(defaultHub?.id))
    }
  }, [defaultHub])

  const businessList = useMemo(() => {
    let filterData = {};
    Object.keys(businessData || {}).forEach(item => {
      if (businessData[item] && businessData[item].length > 0) {
        filterData = { ...filterData, [item]: businessData[item] }
      }
    });
    return filterData;
  }, [businessData])

  const onPressBusiness = (business) => {
    navigation.navigate('BusinessInfo', businessInfo = { business })
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50 }}>
        <View style={{ flex: 1, backgroundColor: Colors.gray50 }}>
          <View style={{ margin: 16, flexDirection: 'row', alignItems: 'center' }}>
            <SearchBar style={{ flex: 1, marginVertical: 0 }} placeholder={'Search for Businesses'} />
            <Pressable onPress={() => { }} hitSlop={10}>
              <Image source={Images.filter} style={{ height: 24, width: 24, marginLeft: 24 }} />
            </Pressable>
          </View>
          <FlatList
            data={Object.keys(businessList) || []}
            contentContainerStyle={{ flexGrow: 1 }}
            renderItem={({ item }) => (
              <BusinessList
                item={businessList?.[item]}
                title={item}
                onPressBusiness={onPressBusiness}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
            ListEmptyComponent={() => (
              <View flex center>
                <Text gray700>No businesses found.</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(Business)