//navigation/index.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import WelcomeScreen from "../screens/WelcomeScreen";
import SavedScreen from "../screens/SavedScreen";
import SplashScreens from "../screens/SplashScreens";
import { Ionicons } from "@expo/vector-icons";
import SearchScreen from "../screens/SearchScreen";
import CryptoMarketScreen from "../screens/CryptoMarketScreen";
import CryptoDetailsScreen from "../screens/CryptoDetailsScreen";
import { useColorScheme } from "nativewind";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Markets") {
              iconName = "wallet-outline"; 
            } else if (route.name === "Saved") {
              iconName = "bookmark-outline";
            } else if (route.name === "Search") {
              iconName = "search-outline";
            }

            const customizeSize = 25;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "green" : "gray"}
              />
            );
          },

          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium",
          },
          tabBarStyle: {
            backgroundColor: colorScheme == "dark" ? "black" : "white",
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Markets" component={CryptoMarketScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen name="CryptoDetails" component={CryptoDetailsScreen}
          options={{ animation: "slide_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}