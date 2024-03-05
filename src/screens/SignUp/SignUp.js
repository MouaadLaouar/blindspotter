import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { Styles } from "./SignUp.Style";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const HandleClick = () => {
    console.log(Email, Password, ConfirmPassword);
  };

  return (
    <View style={Styles.container}>
      <Text>SignUp</Text>
      <TextInput style={Styles.TextInput} placeholder="Email" onChangeText={Text => setEmail(Text)}/>
      <TextInput style={Styles.TextInput} secureTextEntry={ true } placeholder="Password" onChangeText={Text => setPassword(Text)} />
      <TextInput style={Styles.TextInput} secureTextEntry={ true } placeholder="Confirm Password" onChangeText={Text => setConfirmPassword(Text)} />
      <Button title="Sign Up" onPress={HandleClick} />
    </View>
  );
};

export default SignUp;