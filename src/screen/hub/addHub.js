import React, { memo, useEffect, useState } from "react";
import {
  SafeAreaView,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Config from "react-native-config"
import FastImage from "react-native-fast-image";
import { Images, Colors } from "@constants";
import SearchBar from "@component/searchBar";
import HubCard from "@component/hubCard";
import Request from "@services/networkProvider";
import styles from "./styles";
import { getUser, updateUser } from "../../redux/reducer/user";

const AddHub = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const [hubs, _hubs] = useState(undefined);
  const [searchVal, _searchVal] = useState("");
  const [nextLink, _nextLink] = useState('')
  const [loading, _loading] = useState(false)
  const [nomore, _nomore] = useState(false)
  const [addedHub, _addedHub] = useState([])

  const setNextLink = (url) => {
    _nextLink(url?.replace(Config.API_URL, ''))
  }

  useEffect(() => {
    _addedHub(route?.params?.addedHub)
  }, [route?.params?.addedHub])

  useEffect(() => {
    _search();
  }, []);

  const _search = () => {
    let url = "hubs";
    if (searchVal.trim().length > 0) {
      url = `hubs?search=${searchVal}`;
    }
    Request.get(url)
      .then((res) => {
        _hubs(res?.data || []);
        setNextLink(res?.links?.next)
      })
      .catch((err) => { });
  };

  const fetchMore = async () => {
    if (nextLink) {
      try {
        _loading(true)
        const res = await Request.get(nextLink);
        if (res?.data) {
          _hubs(old => [...old, ...res?.data])
          setNextLink(res?.links?.next)
        } else {
          _nomore(true)
        }
        _loading(false)
      } catch (error) {
        _loading(false)
      }
    }
    else {
      _nomore(true)
    }
  }

  const _onSelectHub = (hub) => {
    const selectedHub = { id: hub?.id, default: true };
    dispatch(getUser())
      .then(unwrapResult)
      .then((res) => {
        var updatedUser = { ...res };
        var hubs =
          updatedUser?.hubs?.map((hub) => {
            var temp = Object.assign({}, hub);
            temp.default = false;
            return temp;
          }) || [];
        hubs.push(selectedHub);
        updatedUser["hubs"] = hubs;
        dispatch(updateUser(updatedUser))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            dispatch(getUser())
              .then(unwrapResult)
              .then((response) => {
                route.params.handleItem(true, hub);
                navigation.goBack();
              });
          });
      });
  };

  useEffect(() => {
    const time = setTimeout(() => {
      _search();
    }, 700);
    return () => {
      clearTimeout(time);
    };
  }, [searchVal]);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.purple }} />
      <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
        <View style={{ backgroundColor: Colors.purple }}>
          <View
            row
            centerV
            marginH-16
            marginT-25
            marginB-46
            style={{ justifyContent: "space-between" }}
          >
            <Pressable onPress={navigation.goBack} hitSlop={10}>
              <FastImage source={Images.back} style={{ height: 24, width: 24 }} />
            </Pressable>
            <Text fs16SB center black>
              Cities
            </Text>
            <View style={{ height: 24, width: 24 }} />
          </View>
          <SearchBar
            onChangeText={_searchVal}
            value={searchVal}
            onSearch={_search}
            placeholder={"Search for a City"}
            style={{ position: "absolute", bottom: -26, left: 16, right: 16 }}
          />
        </View>
        {!searchVal?.length ? (
          <View marginT-46 paddingH-16 row spread centerV>
            <Text beb24 lh32 black flex numberOfLines={1}>
              {"Cities Nearby"}
            </Text>
          </View>
        ) : (
          <View marginT-24 paddingH-16 row spread centerV></View>
        )}
        <View flex paddingH-16>
          {hubs?.length ? (
            <FlatList
              data={hubs}
              renderItem={({ item }) => (
                <HubCard
                  item={item}
                  selectText="Add City"
                  onSelect={(hub) => _onSelectHub(hub)}
                  addedHub={addedHub}
                />
              )}
              keyExtractor={(_, index) => index.toString()}
              onEndReached={!nomore && fetchMore}
              ListFooterComponent={() => (
                <View center marginV-20>
                  {nomore && hubs.length ?
                    <Text gray700>No more results.</Text>
                    : <ActivityIndicator animating={loading} size={'large'} />
                  }
                </View>
              )}
              showsVerticalScrollIndicator={false}
              keyboardDismissMode={"on-drag"}
            />
          ) : hubs != undefined ? (
            <View flex center>
              <FastImage
                source={Images.warning}
                style={styles.warningImg}
                resizeMode={"contain"}
              />
              <Text beb24 lh32 black marginT-12>
                City not found
              </Text>
              <Text fs14 lh20 gray500 center>
                Looks like there are no city with this name
              </Text>
              <Text fs14 lh20 gray500 center>
                Try searching for a different city.
              </Text>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </>
  );
};

export default memo(AddHub);

