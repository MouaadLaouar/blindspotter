import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import Button from "../../Components/Button/Button";
import React from "react";
import { Style } from "./SignIn.Style";

import { FIREBASE_AUTH } from "../../Config/FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = FIREBASE_AUTH;

  const SignInFireBase = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, Email, Password);
      // navigation.navigate('Home', {user: res})
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <View style={Style.container}>
      <Text style={Style.Title}>Sign In</Text>
      <TextInput
        style={Style.TextInput}
        placeholder="Email"
        onChangeText={(Text) => setEmail(Text)}
      />
      <TextInput
        style={Style.TextInput}
        placeholder="Password"
        onChangeText={(Text) => setPassword(Text)}
        secureTextEntry={ true }
      />

      {error ? <Text style={Style.Error}>{`${error}`}</Text> : ""}

      <Button title="Sign In" onPress={SignInFireBase} />

      <Text>Don't have an account ?</Text>
      <Text style={Style.SignUp} onPress={() => navigation.navigate("SignUp")}>
        Sign Up
      </Text>
    </View>
  );
};

export default SignIn;
