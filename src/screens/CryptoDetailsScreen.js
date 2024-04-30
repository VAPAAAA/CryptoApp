import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { useColorScheme } from 'nativewind';
import MiniHeader from '../components/Header/MiniHeader';
import HeaderBar from '../components/Header/HeaderBar';
import Loading from "../components/Loading/Loading"; // Make sure this is your custom loading component
import CollapsibleText from '../components/CollapsibleText'; // Import the CollapsibleText component

const CryptoDetailsScreen = ({ route }) => {
  const { cryptoId } = route.params;
  const { colorScheme } = useColorScheme();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCoin(json);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
        <HeaderBar />
        <Text className="text-red-500 text-center text-lg dark:text-white">Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!coin) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
        <HeaderBar />
        <Text className="text-red-500 text-center text-lg dark:text-white">Coin not found!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
      <HeaderBar />
      <MiniHeader label={`${coin.name} Details`} />
      <ScrollView className="px-5">
        <View className="mt-6 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow">
          <Text className="text-2xl font-bold text-center mb-4 dark:text-white">{coin.name} ({coin.symbol.toUpperCase()})</Text>
          <Image source={{ uri: coin.image.large }} className="h-40 w-40 self-center mb-4" />
          <Text className="text-lg dark:text-white mb-2">Current Price: <Text className="font-semibold">${coin.market_data.current_price.usd.toLocaleString()}</Text></Text>
          <Text className="text-lg dark:text-white mb-2">Market Cap: <Text className="font-semibold">${coin.market_data.market_cap.usd.toLocaleString()}</Text></Text>
          <Text className="text-lg dark:text-white mb-2">Volume (24h): <Text className="font-semibold">${coin.market_data.total_volume.usd.toLocaleString()}</Text></Text>
          <Text className="text-lg dark:text-white mb-2">24h High: <Text className="font-semibold">${coin.market_data.high_24h.usd.toLocaleString()}</Text></Text>
          <Text className="text-lg dark:text-white mb-2">24h Low: <Text className="font-semibold">${coin.market_data.low_24h.usd.toLocaleString()}</Text></Text>
          <Text className="text-lg dark:text-white mb-2">Price Change (24h): <Text className="font-semibold">${coin.market_data.price_change_24h_in_currency.usd.toFixed(2)}</Text></Text>
          <Text className="text-lg dark:text-white">Market Cap Change (24h): <Text className="font-semibold">${coin.market_data.market_cap_change_24h_in_currency.usd.toFixed(2)}</Text></Text>
        </View>
        <CollapsibleText text={coin.description.en} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen;
