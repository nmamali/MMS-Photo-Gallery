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
import { FontAwesome } from "@expo/vector-icons";

export default function PicturesScreen({ navigation }: any) {
  const [list, setList] = useState([]);

  useEffect(() => {}, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      // storeData("Pictures",[])
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
        ListEmptyComponent={()=>
          <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <View style={styles.emptyContainer}>
            <FontAwesome
              name={"question-circle"}
              size={100}
              color={"#B32120"}
            />
            <Text style={styles.cardText}>OOPS</Text>
            <Text style={styles.bodyText}>No saved Pond Images</Text>

            <TouchableOpacity
            onPress={() => {
              navigation.navigate("Camera")
            }}
            style={{
              width: 250,
              borderRadius: 4,
              backgroundColor: "#B32120",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Record Images
            </Text>
          </TouchableOpacity>
          </View>
        </View>
        }
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
  emptyContainer: {
    marginVertical: 120,
    padding: 20,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowRadius: 2,
    flexDirection: "column",
    alignItems: "center",
  },
  cardText: {
    color: "grey",
    fontSize: 25,
    alignSelf: "center",
  },
  bodyText: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    marginVertical: 20,
  },
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
