import React, { memo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const ListSkeleton = ({ source }) => {
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
            layout={source == "businessList" ?
              [
                {
                  key: 'header1', width: 70, height: 70, marginBottom: 16, borderRadius: 50,
                },
                {
                  key: 'header2', width: 200, height: 30, marginTop: -80, marginLeft: 100, marginBottom: 16,
                },
                { key: 'someOtherId', width: 170, height: 20, marginBottom: 20, marginLeft: 100 },
                { key: 'someId1', width: 90, height: 25, marginLeft: 100 },
                { key: 'someId2', width: 65, height: 25, marginTop: -30, marginLeft: 260 },
              ] :
              [
                {
                  key: 'header1', width: 40, height: 40, marginBottom: 13, borderRadius: 50,
                },
                {
                  key: 'header2', width: 140, height: 25, marginTop: -50, marginLeft: 50, marginBottom: 13,
                },
                {
                  key: 'header3', width: 50, height: 25, marginTop: -37, marginLeft: 270, marginBottom: 13,
                },
                { key: 'someOtherId', width: 170, height: 15, marginBottom: 15, marginLeft: 50 },
                { key: 'name', width: 200, height: 20, marginBottom: 15, marginLeft: 50 },
                { key: 'someId', width: "auto", height: 25 },
              ]
            }
          ></SkeletonContent>
        )
      }}
      keyExtractor={(_, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      keyboardDismissMode={'on-drag'}
    />
  );
}

export default memo(ListSkeleton)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})