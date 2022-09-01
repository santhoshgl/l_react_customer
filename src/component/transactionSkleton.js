import React, { memo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const { width } = Dimensions.get('screen')

const transactionSkleton = () => {
    return (
        <FlatList
            data={new Array(10)}
            renderItem={({ item, index }) => {
                return (
                    <SkeletonContent
                        containerStyle={{
                            flex: 1, borderWidth: 1, borderColor: Colors.gray200, paddingVertical: 24, paddingLeft: 8,
                            backgroundColor: index % 2 == 0 ? Colors.gray50 : Colors.white,
                            height: 72
                        }}
                        isLoading={true}
                        layout={
                            [
                                {
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: "space-between",
                                    marginRight: 10,
                                    children: [
                                        { width: "20%", height: 20 },
                                        { width: "20%", height: 20 },
                                        { width: "20%", height: 20 },
                                        { width: "20%", height: 20 },
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

export default memo(transactionSkleton)

const styles = StyleSheet.create({
    separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})