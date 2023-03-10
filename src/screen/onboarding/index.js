import React, { memo, useRef, useState } from "react";
import { SafeAreaView, Image, Dimensions, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import Swiper from "react-native-swiper";
import { View, Text, Button } from "react-native-ui-lib";
import { Images, Colors } from "../../constants";
import styles from "./styles";
const { width } = Dimensions.get("screen");

const Onboarding = ({ navigation }) => {
  const ref = useRef();
  const [currentIndex, _currentIndex] = useState(0);
  return (
    <View style={styles.container}>
      <Swiper
        ref={ref}
        showsButtons={false}
        loop={false}
        showsPagination={false}
        style={{ backgroundColor: Colors.white }}
        bounces={false}
        bouncesZoom={false}
        onIndexChanged={(index) => _currentIndex(index)}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          bouncesZoom={false}
        >
          <FastImage
            source={Images.onboarding1}
            style={{ width: width, height: width }}
          />
          <SafeAreaView style={styles.safe}>
            <Text beb36 center marginH-40 black>
              Earn Credits for spending local
            </Text>
            <Text fs16 center marginH-40 marginT-16 black>
              Whether you are grocery shopping or getting a cup of coffee,
              Lealzy helps you to get more for your money.
            </Text>
          </SafeAreaView>
        </ScrollView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          bouncesZoom={false}
        >
          <FastImage
            source={Images.onboarding2}
            style={{ width: width, height: width }}
          />
          <SafeAreaView style={styles.safe}>
            <Text beb36 center marginH-40 black>
              Explore new places in your city
            </Text>
            <Text fs16 center marginH-40 marginT-16 black>
              Looking to try a new resturant in your city? Search hundreds of
              places within the Lealzy app.
            </Text>
          </SafeAreaView>
        </ScrollView>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          bounces={false}
          bouncesZoom={false}
        >
          <FastImage
            source={Images.onboarding3}
            style={{ width: width, height: width }}
          />
          <SafeAreaView style={styles.safe}>
            <Text beb36 center marginH-40 black>
              Enjoy your Rewards
            </Text>
            <Text fs16 center marginH-40 marginT-16 black>
              Credits from where you shop can Be Used At Any Business Inside Of
              Lealzy City.
            </Text>
          </SafeAreaView>
        </ScrollView>
      </Swiper>
      <SafeAreaView style={styles.bottomView}>
        <View center marginT-30 row>
          <View style={currentIndex == 0 ? styles.activeDot : styles.dot} />
          <View style={currentIndex == 1 ? styles.activeDot : styles.dot} />
          <View style={currentIndex == 2 ? styles.activeDot : styles.dot} />
        </View>
        <Button
          style={styles.btn}
          label={"Continue"}
          onPress={() => {
            if (currentIndex == 0) ref.current.scrollBy(1);
            else if (currentIndex == 1) ref.current.scrollBy(2);
            else if (currentIndex == 2)
              navigation.reset({ index: 0, routes: [{ name: "hub" }] });
          }}
        />
      </SafeAreaView>
      <Text
        fs14
        fw500
        black
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "hub" }] })
        }
        style={styles.skip}
      >
        {" "}
        Skip
      </Text>
    </View>
  );
};

export default memo(Onboarding);
