import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import RootNavigation from "./src/Navigation";
import ErrorBoundary from "./src/Components/ErrorBoundary";

export default function App() {
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
