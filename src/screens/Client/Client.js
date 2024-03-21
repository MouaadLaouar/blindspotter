import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Button from "../../Components/Button/Button";

import { FIREBASE_AUTH, FIREBASE_FIRESTORE } from "../../Config/FireBaseConfig";
import usegetLocation from "../../Hooks/usegetLocation";
import * as Location from "expo-location";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

import { doc, updateDoc } from "firebase/firestore";
import LocalStorage from "../../utils/LocalStorage";

const LOCATION_TASK_NAME = "background-location-task";

const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === "granted") {
    const { status: backgroundStatus } =
      await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

TaskManager.defineTask(LOCATION_TASK_NAME, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  const UserId = await LocalStorage.getUserID();
  console.log("UserId => ", UserId);

  let location = await Location.getCurrentPositionAsync({});

  if (UserId) {
    const UserRef = doc(FIREBASE_FIRESTORE, "users", UserId);
    await updateDoc(UserRef, {
      Location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

BackgroundFetch.registerTaskAsync(LOCATION_TASK_NAME, {
  minimumInterval: 60 * 1, // 15 minutes
  stopOnTerminate: false, // android only,
  startOnBoot: true, // android only
});

const Client = (props) => {
  const { User } = props;
  const { coords, errorMsg } = usegetLocation();

  useEffect(() => {
    const sendLocation = async () => {
      await requestPermissions();

      const UserRef = doc(FIREBASE_FIRESTORE, "users", User.id);

      let location = await Location.getCurrentPositionAsync({});

      await updateDoc(UserRef, {
        Location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    };

    sendLocation();
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
          LocalStorage.ClearLocalStorage();
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
