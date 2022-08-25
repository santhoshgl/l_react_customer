import React, { memo, useState } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { Button, RadioButton, RadioGroup, Text, View } from 'react-native-ui-lib';
import CheckBox from '@react-native-community/checkbox';
import { Colors, Images } from '@constants';
import { BusinessCategories, fetchBusinessCategory } from '../../util';

const BusinessFilter = ({ navigation, route }) => {
  const { source, onApplyFilter, filter } = route.params;

  const [sortBy, _sortBy] = useState(filter?.sortBy || (source == "all" ? null : "latest"));
  const [category, _category] = useState(filter?.category || []);

  const isChecked = (item) => {
    const getItemValue = fetchBusinessCategory(item)
    return category.includes(getItemValue) ? true : false
  }

  const categoryHandler = (item) => {
    let categoryArr = [...category]
    if (categoryArr?.includes(item)) {
      categoryArr = categoryArr.filter((s) => s != item)
    } else {
      categoryArr.push(item)
    }
    _category(categoryArr)
  }

  const applyFilterHanlder = () => {
    const applyFilter = {
      sortBy: sortBy
    }
    if (source == "all" || source == "Latest Businesses" || source == "Featured businesses")
      applyFilter['category'] = category;

    onApplyFilter?.(applyFilter);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10} style={{ width: 50 }}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Filter</Text>
          <Text fs14 lh20 center primary600 underline={true} style={{ height: 24, width: 50 }}
            onPress={() => { _sortBy(source == "all" ? null : "latest"), _category([]) }}
          >Reset</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.gray50, paddingHorizontal: 16 }}>
        <View style={styles.viewContainer}>
          <View marginV-16>
            <Text fs14SB lh20 gray900> Sort By </Text>
            <View style={styles.boxSortBy}>
              <RadioGroup initialValue={sortBy} onValueChange={(value) => _sortBy(value)}>
                <View style={styles.radioBoxSort}>
                  <RadioButton
                    color={Colors.primary600}
                    value={'latest'}
                    // labelStyle={sortBy == "latest" && { fontWeight: "600" }}
                    label={<Text fs14 fs14SB={sortBy == "latest"} lh20 gray900>Newest to Oldest</Text>} />
                </View>
                <View style={styles.borderView} />
                <View style={styles.radioBoxSort}>
                  <RadioButton
                    color={Colors.primary600}
                    value={'oldest'}
                    // labelStyle={sortBy == "oldest" && { fontWeight: "600" }}
                    label={<Text fs14 fs14SB={sortBy == "oldest"} lh20 gray900>Oldest to Newest</Text>} />
                </View>
              </RadioGroup>
            </View>
          </View>

          {
            (source == "all" || source == "Latest Businesses" || source == "Featured businesses") && <View marginT-6>
              <Text fs14SB lh20 gray900> By Category </Text>
              <View style={styles.boxSortBy}>
                {
                  Object.keys(BusinessCategories).map((item, index) => {
                    return (
                      <>
                        <View style={styles.categoryByCheck} key={item}>
                          <Text flex fs14={isChecked(item)} fs14SB={isChecked(item)} lh20 gray900> {item} </Text>
                          <CheckBox
                            style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }], height: 20 }}
                            boxType={"square"}
                            onCheckColor={Colors.primary600}
                            onFillColor={"#FFF5F6"}
                            onTintColor={Colors.primary600}
                            tintColors={{ true: Colors.primary600 }}
                            value={isChecked(item)}
                            onValueChange={() => categoryHandler(fetchBusinessCategory(item))}
                          />
                        </View>
                        {
                          !(index == Object.keys(BusinessCategories).length - 1) && <View style={styles.borderView} />
                        }
                      </>
                    )
                  })
                }
              </View>
            </View>
          }
        </View>
        <View style={styles.updateBtn}>
          <Button
            label={'Apply Filter'}
            marginT-40
            marginB-16
            onPress={() => applyFilterHanlder()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(BusinessFilter);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  },
  boxSortBy: {
    borderColor: "#D0D5DD",
    borderWidth: 1,
    borderRadius: 16,
    marginTop: 16
  },
  radioBoxSort: {
    padding: 16
  },
  borderView: {
    borderBottomWidth: 1, borderBottomColor: "#D0D5DD",
  },
  categoryByCheck: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    padding: 16
  },
  updateBtn: {
    paddingHorizontal: 8,
  },
})