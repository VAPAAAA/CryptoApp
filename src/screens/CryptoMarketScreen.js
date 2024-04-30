import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';
import MiniHeader from '../components/Header/MiniHeader';
import Loading from "../components/Loading/Loading";
import { useColorScheme } from 'nativewind';

const CryptoMarketScreen = () => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

  const fetchMarketData = async () => {
    const cachedData = await AsyncStorage.getItem('cryptoData');
    if (cachedData) {
      setCryptoData(JSON.parse(cachedData));
      setIsLoading(false);
      console.log('Data loaded from cache');
    } else {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: false
          }
        });
        if (response.data) {
          setCryptoData(response.data);
          await AsyncStorage.setItem('cryptoData', JSON.stringify(response.data));
          console.log('Data fetched and cached');
        } else {
          console.log("No data received");
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching market data from CoinGecko:', error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Header />
        <MiniHeader label="Markets" />
        <Loading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      <MiniHeader label="Markets" />
      <ScrollView className="px-4">
        {cryptoData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => {
            navigation.navigate('CryptoDetails', { cryptoId: item.id })
          }} className="flex-row items-center my-2 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <View className="flex-row items-center">
              <Text className="text-sm dark:text-white mr-2">{item.market_cap_rank}</Text>
              <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
            </View>
            <View className="flex-1 ml-2">
              <Text className="font-bold text-lg dark:text-white">{item.name} ({item.symbol.toUpperCase()})</Text>
              <Text className="text-gray-500 dark:text-gray-400">${item.current_price.toFixed(2)}</Text>
            </View>
            <View className="mr-4 text-right">
              <Text className="text-xs text-gray-500 dark:text-gray-300">24h</Text>
              <Text className={`${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoMarketScreen;
