import React, { memo, useMemo } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors } from '@constants';
import { Images } from '../../constants';

const OfferCard = ({ item }) => {

  const getCardStyles = useMemo(() => {
    let icon = Images.award;
    let color = Colors.blue;
    if (item?.type == 'Percentage') {
      icon = Images.percent;
      color = Colors.yellow;
    } else if (item?.type == 'Half Price') {
      icon = Images.dollarSign;
      color = Colors.purple;
    } else if (item?.type == 'Free Gift') {
      icon = Images.gift;
      color = Colors.yellow;
    }
    return { icon, color }
  }, [item])

  return (
    <View style={styles.card}>
      <View style={[{ backgroundColor: getCardStyles?.color, ...styles.header }]}>
        <Image source={getCardStyles?.icon} style={{ height: 24, width: 24 }} />
        <View style={styles.badge}>
          <Image source={Images.star} style={{ height: 12, width: 12 }} />
          <Text fs14 lh20 black marginL-4>{item?.credit}</Text>
        </View>
      </View>
      <View margin-16>
        <Text beb24 lh32 black >{item?.title || ''}</Text>
        <Text fs16 lh24 gray700 numberOfLines={2}>{item?.description || ''}</Text>
        <View marginT-12 row centerV >
          <Image source={item?.businessLogo ? { uri: item?.businessLogo } : Images.defaultBusinessSmall} style={{ height: 24, width: 24, borderRadius: 24 }} />
          <Text marginL-6 fs12 lh18 gray700>{item?.businessName}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.bottom}>
        <Image source={Images.check} style={{ height: 16, width: 16 }} />
        <Text fs12 lh18 gray500 marginL-4>Redeemed</Text>
        <Text fs12SB lh18 gray700 marginH-4>{item?.offersRedeemed || 0}</Text>
        <Text fs12 lh18 gray500> times </Text>
      </View>
    </View>
  );
}

export default memo(OfferCard)

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginVertical: 16,
    marginLeft: 16,
    backgroundColor: Colors.white,
    width: 240,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    padding: 16, alignItems: 'center',
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    flexDirection: 'row', justifyContent: 'space-between'
  },
  badge: {
    paddingHorizontal: 8, paddingVertical: 2,
    backgroundColor: Colors.white, borderRadius: 16,
    flexDirection: 'row', alignItems: 'center'
  },
  separator: {
    height: 1, backgroundColor: Colors.gray200
  },
  bottom: {
    marginTop: 8, marginBottom: 12, marginHorizontal: 16,
    flexDirection: 'row', alignItems: 'center'
  }
})
