import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity,ImageBackground, View } from "react-native";

import { RootStackParamList } from "../types";
import { getDataFromAsync, storeData } from "../utils";

export default function PhotoPreviewScreen({
  navigation, route
}: StackScreenProps<RootStackParamList, "NotFound">) {

  
  const [photo, setPhoto] = React.useState(null);

  useEffect(() => {
    getDataFromAsync('preview').then(res=>{
      setPhoto(res)
    })
   
  }, [navigation])


  return (
    
    <View style={{marginTop:10}}>
      <Text style={{fontWeight:'bold', textAlign:'center', fontSize:20}}>
        Full Size Image
      </Text>
          <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
          width: "100%",
          height: 500,
          marginVertical: 5,
          backgroundColor: "#333",
          borderRadius: 30,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 5,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            padding: 15,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          ></View>
        </View>
      </ImageBackground>
    </View>
  );
}

