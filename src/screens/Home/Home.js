import React from "react";
import { Button, View, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button 
      title="Go to About Screen" 
      onPress={() => { navigation.navigate('About') }}
      />
    </View>
  );
}
