import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, ImageBackground } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';
import FastImage from 'react-native-fast-image';
import Config from "react-native-config";
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';
import { showMessage } from "react-native-flash-message";
import { Colors, Images } from '@constants';
import styles from './styles'

const InviteFriends = ({ navigation }) => {

  const shareLink = Config.SHARE_LINK_URL;

  const textCopyHandler = () => {
    Clipboard.setString(shareLink);
    showMessage({ message: "Link copied to clipboard.", type: "success" });
  }

  const shareLinkHandler = () => {
    Share.open({ url: shareLink })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <FastImage source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Invite friends</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View style={styles.listContainer}>
          <View style={styles.imageBanner}>
            <ImageBackground source={Images.inviteFriendBanner} style={styles.image}>
            </ImageBackground>
          </View>
          <View marginH-16>
            <Text beb30 lh38 black flex numberOfLines={1} marginT-24 marginB-13 > Share Lealzy with friends<Text primary600 beb32 >{'.'}</Text> </Text>
            <Text fs16 black lh24 marginB-13 > Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet, tellus sagittis magna donec duis et tincidunt. </Text>
          </View>
          <View marginH-16>
            <Text fs16 lh20 black marginT-24> Send invite </Text>
            <Button onPress={() => shareLinkHandler()} label={'Share'} marginT-8>
              <FastImage source={Images.share} style={{ height: 20, width: 20, marginRight: 10 }} />
            </Button>
          </View>
          <View marginH-16 marginV-24>
            <Text fs16 lh20 black> Or copy link </Text>
            <Button style={styles.copyBtn} marginT-8>
              <FastImage source={Images.link} style={{ height: 20, width: 20, marginRight: 10 }} />
              <Text flex numberOfLines={1} ellipsizeMode='tail' fs16 lh24 gray500> {shareLink} </Text>
              <Text onPress={() => textCopyHandler()} style={{ width: 55, textAlign: "right" }} fs16 lh24 primary700> Copy </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default memo(InviteFriends)
