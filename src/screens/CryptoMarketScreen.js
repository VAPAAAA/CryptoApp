import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { fetchMarketData } from "../utils/CoinGeckoApi";
import Header from "../components/Header/Header";
import MiniHeader from "../components/Header/MiniHeader";
import { SafeAreaView, StatusBar } from 'react-native';
import { useColorScheme } from "nativewind";

const CryptoMarketScreen = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMarketData();
      setCryptoData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-6">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Header />
      <MiniHeader label="Markets" />
      {isLoading ? (
        <Text className="text-center mt-10">Loading...</Text>
      ) : (
        <ScrollView className="px-4">
          {cryptoData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('CryptoDetails', { cryptoId: item.id })} className="flex-row items-center my-2 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow">
              <Image source={{ uri: item.image }} style={{ width: 30, height: 30, marginRight: 10 }} />
              <View className="flex-1">
                <Text className="font-bold text-lg dark:text-white">{item.name} ({item.symbol.toUpperCase()})</Text>
                <Text className="text-gray-500 dark:text-gray-400">${item.current_price.toFixed(2)}</Text>
              </View>
              <Text className={`${item.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CryptoMarketScreen;
