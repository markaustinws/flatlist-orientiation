/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  useEffect, useRef, useState
} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  View,  FlatList, Text,
  Dimensions
} from 'react-native';


type dataType = {
  id: number;
  text: string;
};

const Section = (): React.JSX.Element => {
  const fadeFlatListRef = useRef<FlatList<dataType> | null>(null);

  const [isLandscape, setIsLandscape] = useState(false);

  const buildData = () => {
    const returnArray : dataType[] = [];

    for (let i = 0; i < 100; i++) {
      returnArray.push({ id: i, text: `item ${i}` });
    }
    return returnArray;
  };
  Dimensions.addEventListener("change", ({ window: { width, height } }) => {
    if (width < height) {
      console.log("portrait");
      setIsLandscape(false);
    } else {
      console.log("landscape");
      setIsLandscape(true);
    }
  });
  
  const data = buildData();

  return (
  <View
  className="flex-1"
>
  <FlatList
    ref={fadeFlatListRef}
    initialNumToRender={isLandscape ? 5 : 10}
    viewabilityConfig={{
      waitForInteraction: false,
      minimumViewTime: 10,
      viewAreaCoveragePercentThreshold: 95
    }}
    onViewableItemsChanged={info => {
      //setTopViewableIndex(info?.viewableItems[0]?.index ?? 0);
    }}
    scrollToOverflowEnabled
    keyExtractor={dataItem => dataItem.id.toString()}
    data={data}
    renderItem={dataItem => (
      <View style={{ height: isLandscape ? 50 : 200 }}>
        <Text>{dataItem.item.text}</Text>
      </View>
    )}
  />

</View>)

}

function App(): React.JSX.Element {

  return (
    <SafeAreaView>
    <Section/>
    </SafeAreaView>
  );
}

export default App;
