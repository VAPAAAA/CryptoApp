//WelcomeScreen.js
import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { LinearGradient } from "expo-linear-gradient";

export default function Welcome() {
  const navigation = useNavigation();

  return (
    <ImageBackground
     source={require("../images/CryptoGo.png")}
      className="flex-1 justify-center items-center pb-6 bg-green-900"
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="flex-1 items-center justify-end max-w-[85%]  space-y-4 ">
        <Text
          className="font-bold text-8xl shadow-2xl text-white text-center tracking-wider"
          style={{
            fontSize: wp(13),
            fontFamily: "SpaceGroteskBold",
          }}
        >
          CryptoGo
        </Text>
        <Text
          className="font-bold text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: wp(5),
            fontFamily: "SpaceGroteskMedium",
          }}
        >
          Track prices, get insights, read the latest news – all in one app.
        </Text>
      </View>

      <TouchableOpacity
        className="bg-white rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={() => navigation.navigate("HomeTabs")}
      >
        <Text className="text-2xl text-green-900">Enter</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
