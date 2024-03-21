import { useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import RootNavigation from "./src/Navigation";
import ErrorBoundary from "./src/Components/ErrorBoundary";

// import * as Location from "expo-location";

// const LOCATION_TASK_NAME = "background-location-task";

// const requestPermissions = async () => {
//   const { status: foregroundStatus } =
//     await Location.requestForegroundPermissionsAsync();
//   if (foregroundStatus === "granted") {
//     const { status: backgroundStatus } =
//       await Location.requestBackgroundPermissionsAsync();
//     if (backgroundStatus === "granted") {
//       await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//         accuracy: Location.Accuracy.Balanced,
//       });
//     }
//   }
// };

export default function App() {
  // useEffect(() => {
  //   const requestBackground = async () => {
  //     await requestPermissions();
  //   };

  //   requestBackground();
  // }, []);

  return (
    <SafeAreaView style={styles.SafeArea}>
      <ErrorBoundary>
        <RootNavigation />
      </ErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
});
