import React, { memo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { Colors } from '@constants';

const { width } = Dimensions.get('screen')

const hubCardSkleton = () => {
    return (
        <FlatList
            data={new Array(10)}
            renderItem={({ item }) => {
                return (
                    <SkeletonContent
                        containerStyle={{
                            flex: 1,
                            borderWidth: 1, borderColor: Colors.gray200,
                            borderRadius: 16, marginVertical: 8, padding: 16,
                            backgroundColor: Colors.white,
                            shadowColor: 'rgba(16,24,40,0.05)',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            elevation: 1,
                            paddingBottom: 10
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
                                            width: 50,
                                            height: 50,
                                            borderRadius: width / 2,
                                        },
                                        {
                                            flex: 1,
                                            marginLeft: 10,
                                            children: [
                                                { key: 'new', width: '90%', height: 30 },
                                                {
                                                    flexDirection: 'row',
                                                    marginTop: 5,
                                                    children: [
                                                        { key: 'small', width: '10%', height: 20 },
                                                        { key: 'side', width: '50%', height: 20, marginLeft: 10 }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                },
                                {
                                    flex: 1,
                                    flexDirection: 'row',
                                    marginRight: 10,
                                    marginTop: 10,
                                    children: [
                                        { key: 'middle', width: '50%', height: 50, borderRadius: 12 },
                                        { key: 'middleSide', width: '50%', height: 50, borderRadius: 12, marginLeft: 10 },
                                    ]
                                },
                                {
                                    width: "100%",
                                    height: 1,
                                    marginTop: 10,
                                },
                                {
                                    marginTop: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    children: [
                                        { key: 'bottom', width: '30%', height: 20 }
                                    ]
                                }
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

export default memo(hubCardSkleton)

const styles = StyleSheet.create({
    separator: { marginVertical: 16, height: 1, backgroundColor: Colors.gray200, marginHorizontal: 16 }
})