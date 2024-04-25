import React from 'react';
import { ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { useColorScheme } from 'nativewind';
import cryptoData from '../utils/CryptoData.json'; // Adjust path as needed
import Header from '../components/Header/Header';
import MiniHeader from '../components/Header/MiniHeader';

const CryptoDetailsScreen = ({ route }) => {
  const { cryptoId } = route.params;
  const coin = cryptoData.find(c => c.id === cryptoId); // Find the coin by id
  const { colorScheme } = useColorScheme();

  if (!coin) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
        <Header />
        <Text className="text-red-500 text-center text-lg dark:text-white">Coin not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
      <Header />
      <MiniHeader label={`${coin.name} Details`} />
      <ScrollView className="px-5">
        <Image source={{ uri: coin.image }} style={{ height: 160, width: 160, alignSelf: 'center' }} />
        <Text className="text-xl font-bold text-center mt-4 dark:text-white">{coin.name} ({coin.symbol.toUpperCase()})</Text>
        <View className="mt-6">
          <Text className="text-base dark:text-white">Current Price: ${coin.current_price.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">Market Cap: ${coin.market_cap.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">Volume (24h): ${coin.total_volume.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">24h High: ${coin.high_24h.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">24h Low: ${coin.low_24h.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">Price Change (24h): ${coin.price_change_24h.toFixed(2)}</Text>
          <Text className="text-base dark:text-white">Market Cap Change (24h): ${coin.market_cap_change_24h.toFixed(2)}</Text>
          <Text className="text-base dark:text-white">ATH: ${coin.ath.toLocaleString()}</Text>
          <Text className="text-base dark:text-white">ATL: ${coin.atl.toLocaleString()}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen;
