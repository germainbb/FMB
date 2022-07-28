import { View, Text, Button, Alert } from "react-native";
import React from "react";

export default function Payments() {
//   const inputBody = {
//     subscriber: {
//       msisdn: 776778798,
//     },
//     transaction: {
//       amount: 5,
//       id: 12968801260,
//     },
//     additional_info: [
//       {
//         key: "remark",
//         value: "AIRTXXXXXX",
//       },
//     ],
//     reference: 123456,
//     pin: "KYJExln8rZwb14G1K5UE5YF/lD7KheNUM171MUEG3/f/QD8nmNKRsa44UZkh6A4cR8+fV31D6A4LSwJ4Bz84T29ZDQlunqf/5J+peJ5YO8d5xFIA14pK1rU897WMS0m/D21qsju7w9uT/eab//BzkWkrDOpw5RumI4cxb0YD+o8=",
//   };
//   const headers = {
//     "Content-Type": "application/json",
//     Accept: "*/*",
//     "X-Country": "ZM",
//     "X-Currency": "ZMW",
//     Authorization: "Bearer  UCLcp1oeq44KPXr8X*******xCzki2w",
//   };
//   const Pay = async () => {
//     fetch("https://openapiuat.airtel.africa/standard/v1/cashin/", {
//       method: "POST",
//       body: inputBody,
//       headers: headers,
//     })
//       .then(function (res) {
//         return res.json();
//       })
//       .catch(function (body) {
//         Alert.alert("error")
//         console.log(body);
//       });
//   };

  return (
    <View>
      {/* <Button onPress={Pay} title="Pay" /> */}
      <Text>COMING SOON!</Text>
    </View>
  );
}
