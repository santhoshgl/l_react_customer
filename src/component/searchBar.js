import React, { memo } from "react";
import { StyleSheet, Pressable, View, Image, TextInput } from "react-native";
import { Colors, Images } from "../constants";

const searchBar = ({ onChangeText = () => { }, value, onSearch = () => { }, onFocus = () => { }, ...props }) => {
  const onCloseClick = () => {
    onChangeText('');
    onSearch('');
  }
  return (
    <View style={[styles.searchBox, props?.style, { borderColor: value ? Colors.black : Colors.gray300 }]}>
      <Image source={props?.fromFollowingBusiness ? Images.searchRed : Images.search}
        style={[styles.searchIcon, { tintColor: value ? Colors.primary600 : null }]} resizeMode={'contain'} />
      <TextInput
        placeholder={props?.placeholder || 'Search'}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={Colors.gray500}
        style={styles.textBox}
        onFocus={onFocus}
        returnKeyType={'search'}
        onSubmitEditing={(e) => onSearch(e.nativeEvent.text)}
      />
      {value ?
        <Pressable hitSlop={10} onPress={() => onCloseClick()} style={{ justifyContent: 'center' }} >
          <Image source={Images.close} style={styles.searchIcon} resizeMode={'contain'} />
        </Pressable>
        : null}
    </View>
  )
}

export default memo(searchBar)

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    height: 44, marginVertical: 6,
    paddingHorizontal: 8, paddingVertical: 0,
    borderWidth: 1, borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(16,24,40,0.05)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  textBox: {
    flex: 1, color: Colors.black,
    marginHorizontal: 10, fontFamily: 'NotoSans-Regular'
  },
  searchIcon: { height: 18, width: 18, alignSelf: 'center' },
})