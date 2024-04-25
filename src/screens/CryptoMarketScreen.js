import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../components/Header/Header';
import MiniHeader from '../components/Header/MiniHeader';
import { SafeAreaView, StatusBar } from 'react-native';
import { useColorScheme } from 'nativewind';

const CryptoMarketScreen = () => {
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

  const fetchMarketData = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 25,
          page: 1,
          sparkline: false
        }
      });
      if (response.data) {
        console.log("Market Data Response:", response.data); // Corrected to log actual data
        setCryptoData(response.data);
      } else {
        console.log("No data received");
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching market data from CoinGecko:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      <MiniHeader label="Markets" />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView className="px-4">
          {cryptoData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => {
              console.log("Navigating to details with coinId:", item.id);
              navigation.navigate('CryptoDetails', { cryptoId: item.id })
            }} className="flex-row items-center my-2 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow">
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
