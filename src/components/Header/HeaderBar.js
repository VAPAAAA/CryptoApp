import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/outline';

const HeaderBar = ({ right }) => {
    const navigation = useNavigation();

    return (
        <View className="flex-row justify-between items-center px-4 pb-2 h-24">
            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.goBack()}
            >
                <ArrowLeftIcon size={25} color="rgba(75, 85, 99, 1)" className="text-gray-600"/>
                <Text className="ml-2 text-xl font-bold text-green-800 dark:text-white">Back</Text>
            </TouchableOpacity>

            {right &&
               <View className="flex-1 items-end">
                    <TouchableOpacity>
                        <StarIcon size={25} color="yellow"/> {/* Adjust color for visibility */}
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default HeaderBar;
