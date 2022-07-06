import React, { memo, useEffect, useState } from 'react';
import {
  SafeAreaView, Image, Modal, Platform, UIManager,
  Pressable, FlatList
} from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Images, Colors } from '@constants';
import SearchBar from '@component/searchBar';
import HubCard from '@component/hubCard';
import { animation } from '@util';
import Request from '@services/networkProvider'
import styles from './styles'
import { getUser, updateUser } from '../../redux/reducer/user';

const AddHub = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const [hubs, _hubs] = useState(undefined)
  const [searchVal, _searchVal] = useState('')

  useEffect(() => {
    _search()
  }, [])

  const _search = () => {
    let url = "hubs";
    if (searchVal) {
      url = `hubs?search=${searchVal}`
    }
    Request.get(url).then(res => {
      _hubs(res?.data || [])
    }).catch(err => {
    })
  }

  const _onSelectHub = (hub) => {
    const selectedHub = { id: hub?.id, default: true };
    dispatch(getUser()).then(unwrapResult).then((res) => {
      var updatedUser = { ...res };
      var hubs = updatedUser?.hubs?.map(hub => {
        var temp = Object.assign({}, hub);
        temp.default = false
        return temp;
      }) || [];
      hubs.push(selectedHub);
      updatedUser['hubs'] = hubs;
      dispatch(updateUser(updatedUser)).then(unwrapResult).then((originalPromiseResult) => {
        dispatch(getUser()).then(unwrapResult).then((response) => {
          route.params.handleItem(true, hub)
          navigation.goBack();
        })
      })
    })
  }

  useEffect(() => {
    const time = setTimeout(() => {
      _search()
    }, 700);
    return () => { clearTimeout(time) }
  }, [searchVal])

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.purple }} />
      <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <View style={{ backgroundColor: Colors.purple }}>
          <View row centerV marginH-16 marginT-25 marginB-46 style={{ justifyContent: 'space-between' }}>
            <Pressable onPress={navigation.goBack} hitSlop={10}>
              <Image source={Images.back} style={{ height: 24, width: 24 }} />
            </Pressable>
            <Text fs16SB center black >Hubs</Text>
            <View style={{ height: 24, width: 24 }} />
          </View>
          <SearchBar
            onChangeText={_searchVal}
            value={searchVal}
            onSearch={_search}
            placeholder={'Search for Hubs by City'}
            style={{ position: 'absolute', bottom: -26, left: 16, right: 16 }}
          />
        </View>
        {!searchVal?.length ?
          <View marginT-46 paddingH-16 row spread centerV >
            <Text beb24 lh32 black flex numberOfLines={1} >{'Hubs Nearby'}</Text>
          </View>
          : <View marginT-24 paddingH-16 row spread centerV ></View>
        }
        <View flex paddingH-16>
          {hubs?.length ?
            <FlatList
              data={hubs}
              renderItem={({ item }) => <HubCard item={item} selectText='Add Hub' onSelect={(hub) => _onSelectHub(hub)} />}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={'on-drag'}
            />
            : hubs != undefined ?
              <View flex center>
                <Image source={Images.warning} style={styles.warningImg} resizeMode={'contain'} />
                <Text beb24 lh32 black marginT-12>Hub not found</Text>
                <Text fs14 lh20 gray500 center>Looks like there are no hubs in this city.</Text>
                <Text fs14 lh20 gray500 center>Try searching for a different city.</Text>
              </View>
              : null
          }
        </View>
      </SafeAreaView>

    </>
  );
}

export default memo(AddHub)