import React from "react";
import { Button, View, Text } from "react-native";

export default function About({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>About Screen</Text>
      <Text>Hi Mouaad</Text>
      <Button 
      title="Go Back"
      onPress={() => navigation.goBack()}
      />
    </View>
  );
}