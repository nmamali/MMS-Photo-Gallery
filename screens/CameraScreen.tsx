import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import { getDataFromAsync, storeData } from "../utils";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

let camera: Camera;
export default function CameraScreen({ navigation }: any) {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<any>(null);
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.back
  );
  const [flashMode, setFlashMode] = React.useState("off");
  const [image, setImage] = React.useState(null);

  useEffect(() => {}, [navigation]);
  useFocusEffect(
    React.useCallback(() => {
      setStartCamera(false);
      setPreviewVisible(false);
      setCapturedImage(null);
      return () => null;
    }, [navigation])
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const takePicture = async () => {
    const photo: any = await camera.takePictureAsync();
    setPreviewVisible(true);
    // setStartCamera(false)
    setCapturedImage(photo);
    console.log(photo);
  };
  const savePhoto = (photo: any) => {
    const pic = {
      photo: photo,
      dateCaptured: new Date(),
    };
    getDataFromAsync("Pictures").then((res) => {
      storeData("Pictures", [...res, pic]);
      alert("Saved");
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    savePhoto(result);

    if (!result.cancelled) {
      //@ts-ignore
      setImage(result?.uri);
    }
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };
  const __handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  const __switchCamera = () => {
    if (cameraType === "back") {
      setCameraType("front");
    } else {
      setCameraType("back");
    }
  };
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={savePhoto}
              retakePicture={__retakePicture}
            />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{ flex: 1 }}
              ref={(r) => {
                //@ts-ignore
                camera = r;
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "transparent",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    top: "10%",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === "off" ? "#000" : "#fff",
                      borderRadius: "50%",
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                      borderRadius: "50%",
                      height: 25,
                      width: 25,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                      }}
                    >
                      {cameraType === "front" ? "🤳" : "📷"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    flexDirection: "row",
                    flex: 1,
                    width: "100%",
                    padding: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 250,
              borderRadius: 4,
              backgroundColor: "#B32120",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              pickImage();
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
              Browser Image From Gallery
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  console.log("sdsfds", photo);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={{
          flex: 1,
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
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                Take More
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => savePhoto(photo)}
              style={{
                width: 130,
                height: 40,

                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 20,
                }}
              >
                save photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
