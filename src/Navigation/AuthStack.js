import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login/Login";
import SignUp from "../screens/SignUp/SignUp";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={ Login } />
                <Stack.Screen name="SignUp" component={ SignUp } />
            </Stack.Navigator>
        </NavigationContainer>
    )
}