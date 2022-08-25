import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const BusinessCardSkeleton = () => {
  return (
    <FlatList
      horizontal
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => {
        return (
          <SkeletonContent
            containerStyle={{
              flex: 1,
              borderRadius: 16, marginVertical: 16,
              marginLeft: 16, backgroundColor: Colors.white,
              width: 240,
              height: 250,
              shadowColor: 'rgba(16,24,40,0.05)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 1,
            }}
            isLoading={true}
            layout={[
              {
                flex: 1,
                alignItems: "center",
                children: [
                  { key: 'header', width: 240, height: 100, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
                  { key: 'header', width: 90, height: 45, borderBottomLeftRadius: 45, borderBottomRightRadius: 45 },
                  { key: 'header', width: "65%", height: 25, marginTop: 10 },
                  { key: 'header', width: "35%", height: 20, marginTop: 10 },
                  { key: 'header', width: "45%", height: 20, marginTop: 10, borderRadius: 25 },
                ]
              },
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

export default memo(BusinessCardSkeleton)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})