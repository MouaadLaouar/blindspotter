import * as Location from "expo-location";

export default async function GetLocation() {
  let coords = {
    longitude: null,
    latitude: null,
  };

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    // setErrorMsg("Permission to access location was denied");
    return "Permission to access location was denied";
  }

  let location = await Location.getCurrentPositionAsync({});

  console.log("test Location : ", location);

  //   coords = {
  //     longitude: location.coords.longitude,
  //     latitude: location.coords.latitude,
  //   };

  return location ;
}
