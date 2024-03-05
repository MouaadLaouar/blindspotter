import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useState } from "react";
import { Styles } from "./Login.Style";

import { FIREBASE_AUTH } from "../../Config/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

 
const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const HandleCLick = () => {
    console.log(Email, Password)
  }

  ///////
  const auth = FIREBASE_AUTH;

  const SignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(auth, Email, Password);
        console.log(res)
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <View style={Styles.container}>
      <Text>Login</Text>
      <TextInput style={Styles.TextInput} placeholder="Email" onChangeText={Text => setEmail(Text)}/>
      <TextInput style={ Styles.TextInput } placeholder="Password" onChangeText={Text => setPassword(Text)}/>
      <Button title="Login" onPress={SignIn} />
    </View>
  );
};

export default Login;
