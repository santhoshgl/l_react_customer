import React, { memo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const { width } = Dimensions.get('screen')

const OfferCardSkeleton = ({ isHorizontal = true, skeletonStyle = {} }) => {
  return (
    <FlatList
      horizontal={isHorizontal}
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => {
        return (
          <SkeletonContent
            containerStyle={{
              flex: 1,
              borderRadius: 16, marginVertical: 16,
              marginLeft: 16, backgroundColor: Colors.white,
              width: skeletonStyle?.containerWidth || 240,
              height: 250,
              shadowColor: 'rgba(16,24,40,0.05)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 1,
            }}
            isLoading={true}
            layout={[
              { key: 'header', width: 240, height: 56, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
              {
                marginHorizontal: 16,
                children: [
                  { key: 'header', width: "65%", height: 25, marginTop: 16, },
                  { key: 'header', width: "100%", height: 40, marginTop: 10, },
                  {
                    key: 'someOtherId', flexDirection: 'row', marginTop: 10,
                    children: [
                      { width: width / 10, height: width / 10, borderRadius: width / 2, marginRight: 10 },
                      { width: "40%", height: 20, marginTop: 10 }
                    ]
                  },
                ]
              },
              {
                width: "100%",
                height: 1,
                marginTop: 16,
              },
              {
                width: "60%",
                height: 20,
                marginTop: 8,
                marginLeft: 16
              }
            ]}
          ></SkeletonContent>
        )
      }}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      keyboardDismissMode={'on-drag'}
    />
  );
}

export default memo(OfferCardSkeleton)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})