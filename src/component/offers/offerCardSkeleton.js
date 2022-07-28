import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const OfferCardSkeleton = ({isHorizontal = true, skeletonStyle={}}) => {
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
              { key: 'header', width: skeletonStyle?.layoutHeaderWidth || 240, height: 56, marginBottom: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
              { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 },
              { key: 'name', width: 120, height: 20, marginBottom: 6 },
              { key: 'someId', width: 220, height: 50, marginBottom: 6 },
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