import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const NotificationSkeleton = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={({ item }) => {
        return (
          <SkeletonContent
            containerStyle={{
              flex: 1,
              borderWidth: 1, borderColor: Colors.gray200,
              marginHorizontal: 16, backgroundColor: Colors.white,
              borderRadius: 16, marginVertical: 4, padding: 16,
              marginLeft: 16, backgroundColor: Colors.white,
              shadowColor: 'rgba(16,24,40,0.05)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 1,
            }}
            isLoading={true}
            layout={
              [
                { key: 'header1', width: 32, height: 32, marginBottom: 16, borderRadius: 50, },
                { key: 'header2', width: "60%", height: 20, marginTop: -45, marginLeft: 45, marginBottom: 10, },
                { key: 'header3', width: "85%", height: 20, marginLeft: 45, marginBottom: 10, },
                { key: 'header3', width: "35%", height: 20, marginLeft: 45, },
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

export default memo(NotificationSkeleton)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})