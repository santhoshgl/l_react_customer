import React, { memo, useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  UIManager,
  LayoutAnimation,
  FlatList,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Images, Colors } from "@constants";
import SearchBar from "@component/searchBar";
import HubCard from "@component/hubCard";
import { animation } from "@util";
import Request from "@services/networkProvider";
import styles from "./styles";
import { setLoading } from "../../redux/reducer/loading";
import { getUser, updateUser } from "../../redux/reducer/user";
import HubCardSkleton from "../../component/hubCardSkleton";

const Hub = ({ navigation }) => {
  const dispatch = useDispatch();

  const [hubs, _hubs] = useState(undefined);
  const [searchVal, _searchVal] = useState("");
  const [showHubImg, _showHubImg] = useState(true);
  const [listLoading, _listLoading] = useState(false)

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager?.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);

  const _search = () => {
    if (searchVal.trim().length > 0) {
      _listLoading(true)
      Request.get(`hubs?search=${searchVal}`)
        .then((res) => {
          _listLoading(false)
          _hubs(res?.data || []);
        })
        .catch((err) => _listLoading(false));
    } else _hubs(undefined);
  };

  const _onSelectHub = (hubId) => {
    dispatch(setLoading(true))
    const selectedHub = { id: hubId, default: true };
    dispatch(getUser())
      .then(unwrapResult)
      .then((res) => {
        let updatedUser = { ...res };
        updatedUser["hubs"] = [selectedHub];
        dispatch(updateUser(updatedUser))
          .then(unwrapResult)
          .then((originalPromiseResult) => {
            dispatch(setLoading(false))
            navigation.reset({ index: 0, routes: [{ name: "dashboard" }] });
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"} />
      <View margin-24 flex>
        <FastImage
          source={Images.logo}
          style={styles.logoImg}
          resizeMode={"contain"}
        />
        {showHubImg ? (
          <FastImage
            source={Images.hub}
            style={styles.hubImg}
            resizeMode={"contain"}
          />
        ) : null}
        <Text beb36 center marginT-25 black>
          find your city!
        </Text>
        <Text fs16 center marginT-8 black>
          {
            showHubImg ? "Search for your city below." :
              "Select the city that you would like to earn points from here."
          }
        </Text>
        <SearchBar
          onChangeText={_searchVal}
          value={searchVal}
          onSearch={_search}
          placeholder={"Search for a City"}
          onFocus={() => {
            LayoutAnimation.configureNext(animation);
            _showHubImg(false);
          }}
          style={{ marginTop: 24 }}
        />
        {
          listLoading ? <HubCardSkleton /> :
            hubs?.length ? (
              <FlatList
                data={hubs}
                renderItem={({ item }) => (
                  <HubCard item={item} onSelect={(hub) => _onSelectHub(hub?.id)} />
                )}
                keyExtractor={(_, index) => index.toString()}
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
                  Looks like there are no city with this name.
                </Text>
                <Text fs14 lh20 gray500 center>
                  Try searching for a different city.
                </Text>
              </View>
            ) : null}
      </View>
    </SafeAreaView>
  );
};

export default memo(Hub);
