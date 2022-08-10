import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';
import styles from './styles'

const windowWidth = Dimensions.get('window').width;

const AboutAccount = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >About Lealzy</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View style={styles.imageBanner}>
          <ImageBackground source={Images.aboutBanner} style={[styles.image, { width: windowWidth }]} resizeMode={'contain'} />
        </View>
        <View marginH-16>
          <View flex>
            <Text beb30 lh38 black numberOfLines={1} marginT-24 marginB-13 > About Lealzy<Text primary600 beb32 >{'.'}</Text> </Text>
            {/* <Text fs16 black lh24 marginB-13 > Lealzy is a system that rewards you  </Text> */}
            <Text fs16 black lh24 marginB-13 >Lealzy is a system that rewards you for shopping locally. Here's how it works: As you shop a business in your local city that uses our system, you earn points. Let the points add up, and when you are ready to use them, you can anywhere Lealzy is accepted.</Text>
          </View>
          <View marginT-20>
            <TouchableOpacity style={styles.detailContainer} onPress={() => navigation.navigate('termsAccount')} >
              <Image source={Images.terms} style={styles.featureIcon} />
              <Text fs16 lh24 flex black> Terms and Conditions </Text>
              <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailContainer} onPress={() => navigation.navigate('privacyPolicyAccount')}>
              <Image source={Images.lock} style={styles.featureIcon} />
              <Text fs16 lh24 flex black> Privacy Policy </Text>
              <Image source={Images.chevron_right} style={styles.chevron_rightIcon} />
            </TouchableOpacity>
          </View>
          <View marginV-24>
            <Text gray500 fs14 lh20> Version 1.0 </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(AboutAccount)
