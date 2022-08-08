import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, Linking, StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';

const Faqs = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16SB lh24 center black>FAQ's</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View marginT-16 marginH-16>
          <View flex row marginB-24>
            <View center style={styles.imgHanlder}>
              <Image source={Images.dollarSign} style={styles.iconFaqs} />
            </View>
            <View flex marginL-16>
              <Text fs18SB lh28 black marginB-4 style={styles.fontWeight600}>How much does Lealzy cost?</Text>
              <Text fs16 lh24 black >Lealzy is  completely FREE, so you can start earning your points as soon as you start signing up.</Text>
            </View>
          </View>
          <View flex row marginB-24>
            <View center style={styles.imgHanlder}>
              <Image source={Images.refresh} style={styles.iconFaqs} />
            </View>
            <View flex marginL-16>
              <Text fs18SB lh28 black marginB-4 style={styles.fontWeight600}>How does lealzy work?</Text>
              <Text fs16 lh24 black >When you shop at a business in your local city that uses the Lealzy system, you   earn points. The points add up overtime, and when you are ready to use them, you can anywhere Lealzy is accepted.</Text>
            </View>
          </View>
          <View flex row marginB-24>
            <View center style={styles.imgHanlder}>
              <Image source={Images.star} style={styles.iconFaqs} />
            </View>
            <View flex marginL-16>
              <Text fs18SB lh28 black marginB-4 style={styles.fontWeight600}>Where can I use my points?</Text>
              <Text fs16 lh24 black > Since you are shopping locally, you can use your credits locally. You can use your points anywhere Lealzy is accepted within your city.</Text>
            </View>
          </View>
          <View flex row marginB-24>
            <View center style={styles.imgHanlder}>
              <Image source={Images.briefcase} style={styles.iconFaqs} />
            </View>
            <View flex marginL-16>
              <Text fs18SB lh28 black marginB-4>How can I know if my local business accepts Lealzy?</Text>
              <Text fs16 lh24 black > The Lealzy app has a search function that allows you to not only search for the business you are looking for but also find other ones that participate in Lealzy as well.</Text>
            </View>
          </View>
          <Text marginB-16 fs14 lh20 black>
            Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please <Text underline={true}>chat to our friendly team.</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default Faqs

const styles = StyleSheet.create({
  imgHanlder: { height: 40, width: 40, backgroundColor: "#FFD9DA", borderRadius: 50 },
  iconFaqs: { height: 20, width: 20, tintColor: Colors.primary600 },
})