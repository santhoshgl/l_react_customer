import React, { memo } from 'react';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const { width } = Dimensions.get('screen')

const rewardDetailListSkeleton = ({ source }) => {
    return (
        <FlatList
            data={[1]}
            renderItem={({ item }) => {
                return (
                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            borderWidth: 1, borderColor: Colors.gray200,
                            backgroundColor: Colors.white,
                            borderRadius: 16, marginVertical: 4, padding: 16,
                            backgroundColor: Colors.white,
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
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginRight: 10,
                                    children: [
                                        {
                                            width: width / 7,
                                            height: width / 7,
                                            borderRadius: width / 2,
                                        },
                                        {
                                            flex: 1,
                                            marginLeft: 10,
                                            children: [
                                                { key: 'someOtherId', width: '90%', height: 30 },
                                                { key: 'someId1', width: "60%", height: 20, marginTop: 10 },
                                            ]
                                        }

                                    ]
                                },
                            ] :
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
                                                {
                                                    key: 'someOtherId', flexDirection: 'row', justifyContent: "space-between",
                                                    children: [
                                                        { width: "50%", height: 25 },
                                                        { width: "15%", height: 25, borderRadius: 25 }
                                                    ]
                                                },
                                                { key: 'someId1', width: "80%", height: 30, marginTop: 8 },
                                            ]
                                        }

                                    ]
                                },
                            ]
                        }
                    ></SkeletonContent >
                )
            }}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            keyboardDismissMode={'on-drag'}
        />
    );
}

export default memo(rewardDetailListSkeleton)

const styles = StyleSheet.create({
    separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})