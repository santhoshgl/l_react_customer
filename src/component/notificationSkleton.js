import React, { memo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const { width } = Dimensions.get('screen')

const NotificationSkeleton = () => {
  return (
    <FlatList
      data={new Array(10)}
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
                {
                  flex: 1,
                  flexDirection: 'row',
                  marginRight: 10,
                  children: [
                    {
                      width: width / 10,
                      height: width / 10,
                      borderRadius: width / 2,
                    },
                    {
                      flex: 1,
                      marginLeft: 10,
                      marginTop: 5,
                      children: [
                        { key: 'someId100', width: "100%", height: 20 },
                        { key: 'someId200', width: "100%", height: 20, marginTop: 5 },
                        { key: 'someId300', width: "30%", height: 20, marginTop: 5 },
                      ]
                    }
                  ]
                },
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

export default memo(NotificationSkeleton)

const styles = StyleSheet.create({
  separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})