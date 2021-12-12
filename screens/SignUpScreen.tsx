import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import * as firebase from "firebase";
require("firebase/auth");
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image, TextInput,
} from "react-native";
import { RootStackParamList } from "../types";
import {AntDesign, FontAwesome5, Fontisto} from "@expo/vector-icons";
import {Button, CheckBox, Content, Item, Left, Right, Spinner} from "native-base";
import DDTextInput from "../components/DDTextInput";
import theme from "../assets/theme";
import DDButton from "../components/DDButton";



interface typeOfDiabetic{
  value: boolean,
  type: string
}


export default function SignUpScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  const [fullName, setFullName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [waistCircumference, setWaistCircumference] = useState<string>("");


  const [typeOfDiabetic, setTypeOfDiabetic] = useState<string | null>(null);
  const [otherComorbidities, setOtherComorbidities] = useState<string>("");


  const [showDiabeticType, setShowDiabeticType] = useState<boolean>(false);

  const [showComorbidities, setShowComorbidities] = useState<boolean>(false);


  const navigateApp = () => {
    setLoading(true);

    if (!email.includes("@")) {
      alert("Invalid Email");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      alert("Password must be greater than 6 characters");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          navigation.replace("Root");
        })
        .catch((e) => {
          alert(JSON.stringify(e.message));
          setLoading(false);
        });
    }
    setLoading(false);
  };

  const EmailIcon = () => (
    <Fontisto
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"email"}
      size={18}
    />
  );
  const PasswordIcon = () => (
    <Fontisto
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"locked"}
      size={18}
    />
  );

  const WeightIcon = () => (
    <FontAwesome5
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"weight"}
      size={18}
    />
  );

  const NameIcon = () => (
    <FontAwesome5
      style={{ marginLeft: 10 }}
      color={theme.orange}
      name={"user"}
      size={18}
    />
  );


  const DateIcon = () => (
      <FontAwesome5
          style={{ marginLeft: 10 }}
          color={theme.orange}
          name={"calendar"}
          size={18}
      />
  );

  const MoreDropDown = () => (
      <AntDesign
          style={{ marginRight: 5 }}
          color={theme.orange}
          name={"down"}
          size={18}
      />
  );




  // @ts-ignore
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
          style={{ width: 400 , height: 100, marginTop: 120}}
        resizeMode={"contain"}
        source={require("../assets/images/mainLogo.png")}
      />
      <DDTextInput icon={ <NameIcon/>} onTextChange={setFullName} placeholder={"Full Name"}/>
      {/*<DDTextInput icon={ <DateIcon/>} onTextChange={setDateOfBirth} placeholder={"Date Of Birth"}/>*/}
      {/*<DDTextInput icon={ <WeightIcon/>} onTextChange={setWeight} placeholder={"Weight"}/>*/}
      {/*<DDTextInput icon={ <WeightIcon/>} onTextChange={setHeight} placeholder={"Height"}/>*/}
      {/*<DDTextInput icon={ <WeightIcon/>} onTextChange={setWaistCircumference} placeholder={"Waist circumference (in cm)"}/>*/}
      <DDTextInput icon={ <EmailIcon/>} onTextChange={setEmail} placeholder={"Email"}/>
      <DDTextInput icon={ <PasswordIcon/>} onTextChange={setPassword} placeholder={"Password"}/>
      <DDTextInput icon={ <PasswordIcon/>} onTextChange={setConfirmPassword} placeholder={"Confirm Password"}/>



      {/*<TouchableOpacity style={styles.inputView} onPress={()=>setShowDiabeticType(!showDiabeticType)}>*/}
      {/*  <Left/>*/}
      {/*  <Text style={{fontSize: 17, color: theme.ODO_TEXT_COLOR}}>*/}
      {/*    {typeOfDiabetic? typeOfDiabetic.toUpperCase(): " Select type of diabetes diagnosed"}*/}
      {/*  </Text>*/}
      {/*  <Right>*/}
      {/*    <MoreDropDown/>*/}
      {/*  </Right>*/}
      {/*</TouchableOpacity>*/}


      {/*{showDiabeticType &&<View style={styles.dropDown}>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowDiabeticType(false)*/}
      {/*        setTypeOfDiabetic("type1")*/}
      {/*      }}*/}
      {/*      style={{fontSize: 17, paddingVertical: 5}}>Type 1*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowDiabeticType(false)*/}
      {/*        setTypeOfDiabetic("type2")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17}}>Type 2*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowDiabeticType(false)*/}
      {/*        setTypeOfDiabetic("gestational")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17, paddingVertical: 5}}>*/}
      {/*    Gestational*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowDiabeticType(false)*/}
      {/*        setTypeOfDiabetic("other")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17}}>Other</Text>*/}

      {/*</View>*/}
      {/*}*/}



      {/*<TouchableOpacity style={styles.inputView} onPress={()=>setShowComorbidities(!showComorbidities)}>*/}
      {/*  <Left/>*/}
      {/*  <Text style={{fontSize: 17, color: theme.ODO_TEXT_COLOR}}>*/}
      {/*    {showComorbidities? otherComorbidities.toUpperCase(): "Select other comorbidities"}*/}
      {/*  </Text>*/}
      {/*  <Right>*/}
      {/*    <MoreDropDown/>*/}
      {/*  </Right>*/}
      {/*</TouchableOpacity>*/}


      {/*{showComorbidities &&<View style={styles.dropDown}>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowComorbidities(false)*/}
      {/*        setOtherComorbidities("hypertension")*/}
      {/*      }}*/}
      {/*      style={{fontSize: 17, paddingVertical: 5}}>Hypertension*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowComorbidities(false)*/}
      {/*        setOtherComorbidities("cholesterol")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17}}>Cholesterol*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowComorbidities(false)*/}
      {/*        setOtherComorbidities("gestational")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17, paddingVertical: 5}}>*/}
      {/*    Overweight*/}
      {/*  </Text>*/}
      {/*  <Text*/}
      {/*      onPress={()=>{*/}
      {/*        setShowComorbidities(false)*/}
      {/*        setOtherComorbidities("other")*/}

      {/*      }}*/}
      {/*      style={{fontSize: 17}}>Other</Text>*/}

      {/*</View>*/}
      {/*}*/}
      <View/>

      {!loading && (
        <>
          <DDButton onSubmit={navigateApp} text={"SignUp"}/>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.SignUpText}>
              Already have an account, Login?
            </Text>
          </TouchableOpacity>
        </>
      )}
      {loading && <Spinner color="#B32120" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
    height: 50,
    padding: 10,
    color: theme.darkestGrey,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50
  },
  container1: {
    flex: 1,
  },
  topNav: {
    marginTop: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "normal",
    fontSize: 50,
    color: "#fff",
    marginBottom: 70,
  },

  forgot: {
    color: "#B32120",
    fontSize: 15,
    marginTop: 18,
  },
  SignUpText: {
    color: theme.orange,
    fontSize: 15,
    textDecorationLine: "underline",
  },
  inputView: {
    width: "82%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 30,
    margin: 10,
    marginLeft: 10,
    borderColor: theme.orange,
    borderWidth: 0.6
  },

  dropDown: {
    width: "82%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    borderRadius: 5,
    height: 120,
    marginHorizontal: 10,
    marginLeft: 10,
    borderColor: theme.orange,
    borderWidth: 0.6,
    marginTop: -10,
    borderTopWidth: 0,
    paddingHorizontal:10
  }
});
