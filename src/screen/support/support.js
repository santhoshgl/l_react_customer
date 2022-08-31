import React from "react";
import { Pressable, SafeAreaView ,Linking, Platform} from "react-native";
import { Text, View, TouchableOpacity } from "react-native-ui-lib";
import FastImage from "react-native-fast-image";
import { Images } from "@constants";
import style from "./style";
import Config from "react-native-config";

const mailId = Config.MAILBOXID;
const googlePackageName = Config.GOOGLE_PACKAGE_NAME
const appleStoreId = Config.APPLE_STORE_ID

const Support = ({ navigation }) => {



  const onPresRate = () =>{
    if (Platform.OS != 'ios') {
      //To open the Google Play Store
      Linking.openURL(`market://details?id=${googlePackageName}`).catch(err =>
        alert('Please check for the Google Play Store')
      );
    } else {
      //To open the Apple App Store
      Linking.openURL(
        `itms://itunes.apple.com/in/app/apple-store/${appleStoreId}`
      ).catch(err => alert('Please check for the App Store'));
    }
  }
  return (
    <SafeAreaView style={style.flex1}>
      <View style={style.flex1}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: "space-between" }} >
          <TouchableOpacity onPress={navigation.goBack} hitSlop={10}>
            <FastImage source={Images.back} style={style.backIcon} />
          </TouchableOpacity>
          <Text fs16 lh24 center black style={style.fontWeight500}>
            Support
          </Text>
          <View style={style.supportText} />
        </View>

        <View style={style.mainWrapper}>
          <Pressable onPress={() => { navigation.navigate("Faqs") }}
           style={style.supportTextWrapper}>
            <FastImage resizeMode={"contain"} source={Images.help_circle} style={style.commonIconDesign} />
            <Text fs16 lh16 marginL-17 black center style={style.fontWeight400}>
              FAQs
            </Text>
            <View style={style.arrowRightWrapper}>
              <FastImage source={Images.chevron_right} style={style.arrowRight} />
            </View>
          </Pressable>
          <View style={style.line} />

          <Pressable onPress={()=>  Linking.openURL(`mailto:${mailId}`)}
            style={[style.supportTextWrapper, style.marginTop]}>
            <FastImage source={Images.mail} resizeMode={"contain"} style={style.commonIconDesign} />
            <Text fs16 lh16 marginL-17 black center style={[style.fontWeight400, style.top]} >
              Send us feedback
            </Text>
            <View style={style.arrowRightWrapper}>
              <FastImage source={Images.chevron_right} style={style.arrowRight} />
            </View>
          </Pressable>

          <View style={style.line} />
          <Pressable style={[style.supportTextWrapper, style.marginTop]} onPress={() => onPresRate()}>
            <FastImage source={Images.thumbs_up} resizeMode={"contain"} style={style.commonIconDesign} />
            <Text fs16 lh16 marginL-17 black center style={style.fontWeight400}>
              Rate the App
            </Text>
            <View style={style.arrowRightWrapper}>
              <FastImage source={Images.chevron_right} style={style.arrowRight} />
            </View>
          </Pressable>
          <View style={style.line} />

        </View>
      </View>
    </SafeAreaView>
  );
};
export default Support;
