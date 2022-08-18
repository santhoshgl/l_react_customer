import React, { memo, useMemo } from 'react';
import { SafeAreaView, Image, Pressable, StyleSheet, ImageBackground } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors } from '@constants';
import { Images } from '../../constants';

const BusinessCard = ({ item, onPressBusiness }) => {
  return (
    <Pressable onPress={() => onPressBusiness(item)} style={styles.card}>
      <ImageBackground source={item?.bannerImage ? { uri: item?.bannerImage } : Images.businessCover} imageStyle={styles.backImg} >
        <Image source={item?.logo ? { uri: item?.logo } : Images.defaultBusiness} style={styles.logo} />
        <Text beb24 ln32 center marginT-8 black >{item?.name}</Text>
        <Text fs14 ln20 center gray500 >{item?.category?.label}</Text>
        <View style={styles.tag} >
          <Image source={Images.offers} style={{ height: 12, width: 12 }} />
          <Text fs14 ln20 gray700 marginL-4 >Offers: <Text fs14SB >{item?.totalOffers || 0}</Text></Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

export default memo(BusinessCard)

const styles = StyleSheet.create({
  card: {
    borderRadius: 16, marginVertical: 16,
    marginLeft: 16, backgroundColor: Colors.white,
    width: 240,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  backImg: {
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    height: 120, width: 240,
  },
  logo: { height: 80, width: 80, borderRadius: 80, marginTop: 78, alignSelf: 'center' },
  tag: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 12, alignSelf: 'center',
    backgroundColor: Colors.gray100, paddingVertical: 4,
    paddingHorizontal: 10, borderRadius: 16,
    marginBottom: 24
  }
})
