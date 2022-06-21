import React, { memo, useState } from 'react';
import { SafeAreaView, Image, Pressable, Modal } from 'react-native';
import { Text, View, Button } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';

const Header = () => {
  const [showHubs, _showHubs] = useState(false)
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.white }}>
        <View right row centerV marginT-12 marginH-16>
          <Image source={Images.bell} style={{ height: 24, width: 24, marginRight: 27 }} />
          <Image source={{ uri: 'https://picsum.photos/200' }} style={{ height: 32, width: 32, borderRadius: 32 }} />
        </View>
        <View row centerV marginV-12 marginH-16>
          <Image source={{ uri: 'https://picsum.photos/300' }} style={{ height: 40, width: 40, borderRadius: 40 }} />
          <Text beb30 black marginH-12 numberOfLines={1}>Lealzy.Phoenix</Text>
          <Pressable onPress={() => _showHubs(true)}>
            <Image source={Images.down} style={{ height: 24, width: 24, borderRadius: 24 }} />
          </Pressable>
        </View>
      </SafeAreaView>
      {showHubs ?
        <Modal visible={true} transparent animationType={'none'} onRequestClose={() => _showHubs(false)} >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} >
            <View padding-24 bg-white style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }} >
              <View style={{ flexDirection: 'row', borderRadius: 24, justifyContent: 'space-between' }} >
                <View style={{ height: 24, width: 24 }} />
                <Text fs16SB black >Hubs</Text>
                <Pressable onPress={() => _showHubs(false)} >
                  <Image source={Images.x} style={{ height: 24, width: 24 }} />
                </Pressable>
              </View>
              <View style={{ marginTop: 24 }}>
                {[1, 2, 3]?.map((_, i) => {
                  return (
                    <View row centerV marginV-8 key={i} >
                      <Image source={{ uri: `https://picsum.photos/200` }} style={{ height: 32, width: 32, borderRadius: 32 }} />
                      <Text beb24 black marginH-12 lh32 numberOfLines={1}>Lealzy.Phoenix</Text>
                    </View>
                  )
                })}
                <Button
                  label={'Add another Hub'}
                  marginV-24
                  onPress={() => { }}
                />
              </View>
            </View>
          </View>
        </Modal>
        : null}
    </>
  );
}

export default memo(Header)