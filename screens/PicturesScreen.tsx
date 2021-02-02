import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import { getDataFromAsync, storeData } from "../utils";
import { Item } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

export default function PicturesScreen({ navigation }: any) {
  const [list, setList] = useState([]);

  useEffect(() => {}, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      getDataFromAsync("Pictures").then((res) => {
        setList(res);
        console.log(res);
      });
      return () => null;
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
        }}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={4}
        data={list}
        numColumns={2}
        renderItem={({ item }) => (
          <CameraPreview
          navigation={navigation}
            photo={item?.photo}
            dateCaptured={item?.dateCaptured}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const CameraPreview = ({ photo, dateCaptured, navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={()=>
        {
          navigation.navigate("Preview");
          storeData('preview', photo)
        }
      
      
      }
      style={{
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 8,
      }}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 6 }}
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
          width: 165,
          height: 170,
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
      <View style={{ marginHorizontal: 5 }}>
        <Text style={{ fontWeight: "bold", color: "grey" }}>
          Date Captured: {new Date(dateCaptured).getFullYear()}-
          {new Date(dateCaptured).getMonth()}-{new Date(dateCaptured).getDay()}
        </Text>

        <Text style={{ fontWeight: "bold", color: "grey" }}>
          Time Taken: {new Date(dateCaptured).getHours()}:
          {new Date(dateCaptured).getMinutes()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
