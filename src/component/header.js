import React, { memo, useState } from 'react';
import { SafeAreaView, Image, Pressable, Modal, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { Colors, Images } from '@constants';

const windowHeight = Dimensions.get('window').height;

const Header = ({ navigation }) => {
  const { userData, defaultHub } = useSelector(s => s.user);
  const [showHubs, _showHubs] = useState(false)
  const [showHubAdded, _showHubAdded] = useState(false)
  const [addedHub, _addedHub] = useState(undefined)

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.white, borderBottomColor: Colors.gray200, borderBottomWidth: 1 }}>
        <View right row centerV marginT-12 marginH-16>
          <Image source={Images.bell} style={{ height: 24, width: 24, marginRight: 27 }} />
          <Image
            onPress={() => { }}
            source={{ uri: userData?.profilePicture }}
            style={{ height: 32, width: 32, borderRadius: 32 }} />
        </View>
        <View row centerV marginV-12 marginH-16>
          <Image source={{ uri: defaultHub?.logo }} style={{ height: 40, width: 40, borderRadius: 40 }} />
          <Text beb30 black marginH-12 numberOfLines={1}>{defaultHub?.name}</Text>
          <Pressable onPress={() => _showHubs(true)}>
            <Image source={Images.down} style={{ height: 24, width: 24, borderRadius: 24 }} />
          </Pressable>
        </View>
      </SafeAreaView>
      {showHubs ?
        <Modal visible={true} transparent animationType={'none'} onRequestClose={() => _showHubs(false)} >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} >
            <View padding-24 bg-white style={{ borderTopLeftRadius: 24, maxHeight: (windowHeight / 1.5), borderTopRightRadius: 24 }} >
              <View style={{ flexDirection: 'row', borderRadius: 24, justifyContent: 'space-between', marginBottom: 24 }} >
                <View style={{ height: 24, width: 24 }} />
                <Text fs16SB black >Hubs</Text>
                <Pressable onPress={() => _showHubs(false)} >
                  <Image source={Images.x} style={{ height: 24, width: 24 }} />
                </Pressable>
              </View>

              <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                {userData?.hubs?.map((_hub, i) => {
                  return (

                    <View row centerV marginV-8 key={i} >
                      <Image source={{ uri: _hub?.logo }} style={{ height: 32, width: 32, borderRadius: 32 }} />
                      <Text beb24 black marginH-12 lh32 numberOfLines={1}>{_hub?.name}</Text>
                    </View>

                  )
                })}
              </ScrollView>
              <Button
                label={'Add another Hub'}
                marginV-24
                onPress={() => {
                  _showHubs(false);
                  navigation.navigate("addHub", {
                    handleItem: (item, hub) => { _addedHub(hub); _showHubAdded(item) },
                  });
                }}
              />
            </View>
          </View>
        </Modal>
        : null}
      {showHubAdded && addedHub ?
        <Modal visible={true} transparent animationType='fade' >
          <View style={{ flex: 1, padding: 16, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} >
            <View padding-16 marginB-94 bg-white style={{ borderRadius: 16 }} >
              <ImageBackground
                source={{ uri: addedHub?.bannerImage }}
                imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, height: 122 }} >
                <Pressable onPress={() => _showHubAdded(false)} >
                  <Image source={Images.x} style={{ height: 20, width: 20, position: 'absolute', top: 12, right: 12, tintColor: Colors.white }} />
                </Pressable>
                <Image source={{ uri: addedHub?.logo }}
                  style={{
                    height: 72, width: 72, borderRadius: 75, marginTop: 86, alignSelf: 'center',
                    borderWidth: 3, borderColor: Colors.white
                  }}
                />
                <Text beb24 ln32 center marginT-16 marginB-8 black >{`${addedHub?.name} Added!`}</Text>
                <Text fs14 ln20 center gray500 marginB-8>{addedHub?.description}</Text>
                <Text fs14SB lh20 primary700 center marginV-8 onPress={() => _showHubAdded(false)} >{'Continue'}</Text>
              </ImageBackground>
            </View>
          </View>
        </Modal >
        : null}
    </>
  );
}

export default memo(Header)