import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../Components/Button/Button";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../Config/FireBaseConfig";
import usegetLocation from "../../Hooks/usegetLocation";
import * as Location from "expo-location";
import { doc, updateDoc } from "firebase/firestore";

const Client = (props) => {
  const { User } = props;
  const { coords, errorMsg } = usegetLocation();

  useEffect(() => {
    setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const UserRef = doc(FIREBASE_FIRESTORE, "users", User.id);

      await updateDoc(UserRef, {
        Location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    }, 60000);
  }, []);

  return (
    <View style={Style.container}>
      <Text style={Style.AppBarText}>Hello, {`${User.Name}`} 👋</Text>
      <Text style={Style.Text}>
        Your location has been securely sent to our server for assistance
        purposes. Thank you for trusting us.
      </Text>
      <Button
        title="Logout"
        onPress={() => {
          FIREBASE_AUTH.signOut();
        }}
      />

      <Text>latitude : {coords ? coords.latitude : ""}</Text>
      <Text>longitude : {coords ? coords.longitude : ""}</Text>

      <Text>{errorMsg ? errorMsg : ""}</Text>
    </View>
  );
};

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  AppBarText: {
    fontSize: 20,
  },
  Text: {
    textAlign: "center",
  },
});

export default Client;
