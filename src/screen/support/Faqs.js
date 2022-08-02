import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, Linking } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';
import style from './style'

const Faqs = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black style={style.fontWeight500}>FAQ's</Text>
          <View style={{ height: 24, width: 24}} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black style={style.fontWeight500}> Title </Text>
          <Text fs14 lh20 gray700 marginT-8 style={style.fontWeight400}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sodales amet pulvinar amet etiam id tortor. Porttitor eget id varius in malesuada scelerisque. Bibendum a orci vulputate morbi vitae. In egestas suspendisse proin lectus lobortis a, nisl consectetur. Ac arcu vitae, rhoncus nibh cras sit tempus, odio eget. Erat lacinia aliquet nec varius proin et turpis risus enim. Libero ut eros, semper molestie aenean integer. Morbi etiam venenatis nec amet.
          </Text>
          <Text fs14 lh20 gray700 marginT-16 style={style.fontWeight400}>
            Vitae eleifend eget facilisi ullamcorper diam. Venenatis, elementum enim massa pretium massa urna, nisl. Id phasellus convallis mi morbi at turpis sed eget. Vitae mattis placerat augue sit at sed vestibulum. Nisl iaculis augue tristique sed nulla aenean odio.
          </Text>
        </View>
        <View marginV-32 marginH-16>
          <Text fs16 lh24 black style={style.fontWeight500}> Title </Text>
          <View>
            <View marginT-3 style={{ flexDirection: 'row' }}>
              <Text fs14 lh20 gray700 style={style.fontWeight400}>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Proin risus, feugiat morbi a elit commodo. Ullamcorper placerat elit condimentum ligula malesuada turpis donec tincidunt a. Risus sed turpis pulvinar dolor sed pulvinar.</Text>
            </View>
            <View marginT-3 style={{ flexDirection: 'row' }}>
              <Text fs14 lh20 gray700 style={style.fontWeight400}>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={[style.fontWeight400, { paddingLeft: 5 }]} >Mauris lorem quis ac pharetra malesuada curabitur tortor sodales. Quis non erat purus elit imperdiet aenean amet erat quis. Diam sodales netus ac dignissim vel in lectus.</Text>
            </View>
            <View marginT-3 style={{ flexDirection: 'row' }}>
              <Text fs14 lh20 gray700 style={style.fontWeight400}>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={[style.fontWeight400, { paddingLeft: 5 }]} >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            </View>
            <View marginT-3 style={{ flexDirection: 'row' }}>
              <Text fs14 lh20 gray700 style={style.fontWeight400}>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={[style.fontWeight400, { paddingLeft: 5 }]} >Sodales amet pulvinar amet etiam id tortor. Porttitor eget id varius in malesuada scelerisque. Bibendum a orci vulputate morbi vitae. In egestas suspendisse proin lectus lobortis a, nisl consectetur. Ac arcu vitae, rhoncus nibh cras sit tempus, odio eget. Erat lacinia aliquet nec varius proin et turpis risus enim. Libero ut eros, semper molestie aenean integer. Morbi etiam venenatis nec amet.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default Faqs
