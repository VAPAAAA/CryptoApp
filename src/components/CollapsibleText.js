import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const CollapsibleText = ({ text, numberOfLines = 6 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
      <Text className="text-lg font-bold dark:text-white">Description:</Text>
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines}
        className="text-base dark:text-gray-300"
      >
        {text}
      </Text>
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text className="text-green-800 mt-2">
          {isExpanded ? 'Read less' : 'Read more'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollapsibleText;
