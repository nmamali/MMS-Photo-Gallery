import { StackScreenProps } from '@react-navigation/stack';
import React , { useState } from 'react';
import * as firebase from 'firebase';
require('firebase/auth');

import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
   ScrollView,
   TextInput,
   Text,
   TouchableOpacity,
    Image,
   ImageBackground} from 'react-native';
import { RootStackParamList } from '../types';
import { Fontisto } from "@expo/vector-icons";
import { Button, Content, Spinner } from 'native-base';
export default function SignUpScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [confirmPassword, setConfirmPassword ] = useState("");
  const [loading, setLoading] = useState(false)

  const navigateApp =  () => {
    setLoading(true)

      if(!email.includes("@")){
        alert('Invalid Email')
        setLoading(false)
        return;
      }
      if(password.length<6){
        alert('Password must be greater than 6 characters')
        setLoading(false)
        return;
      } else if(password !== confirmPassword){
        alert('Passwords do not match')
        setLoading(false)
        return;
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(email, password).then((res)=>{
          navigation.replace('Root')
        })
        .catch((e)=>{
          alert(JSON.stringify(e.message))
          setLoading(false)

        })
      }
      setLoading(false)

  }



  const EmailIcon = () => (
    <Fontisto style= {{marginLeft: 10}} color= "#ebeff5" name={"email"} size={18}/>
  );
  const PasswordIcon = () => (
    <Fontisto style= {{marginLeft: 10}} color= "#ebeff5" name={"locked"} size={18}/>
  )

  return (
    <View style={styles.container}>
              <Image style={{width: 300, height: 220}} resizeMode={'contain'} source={require('../assets/images/logo2.png')}/>

   <View style={styles.inputView}>
          <EmailIcon/>
          <TextInput
            style={styles.inputText}
            placeholderTextColor = {"#ebeff5"}
            placeholder="Email"
            autoCapitalize = 'none'
            onChangeText={text => setEmail(text)}

           />
        </View>
        <View style={styles.inputView}>
          <PasswordIcon/>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholderTextColor = {"#ebeff5"}
            placeholder="Password"
            onChangeText={text => setPassword(text)}

           />
        </View>

        <View style={styles.inputView}>
          <PasswordIcon/>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholderTextColor = {"#ebeff5"}
            placeholder="Confirm Password"
            onChangeText={text => setConfirmPassword(text)}

           />
        </View>
        <View>

      

        </View>

        {!loading && <>
        <Button style={styles.loginBtn} onPress={()=>navigateApp()}>
          <Text style={{color:"#FFF"}}>SignUp</Text>
          </Button> 
       
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.SignUpText}>Already have an account, Login?</Text>
        </TouchableOpacity>
        </>}
        {
          loading && <Spinner color="#B32120"/>
        }



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1
  },
  topNav : {
    marginTop : 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  logo:{
    fontWeight:"normal",
    fontSize:50,
    color:"#fff",
    marginBottom:70,
  },
  inputView:{
    width:"82%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B32120',
    borderRadius: 10,
    height: 50,
    borderBottomWidth: 0,
    margin: 10,
    marginLeft :10
  },
  inputText:{
    flex: 1,
    height:50,
    padding: 10,
    color:"#ebeff5"
  },
  forgot:{
    color:"#B32120",
    fontSize:15,
    marginTop: 18,
  },
  loginBtn:{
    width:"82%",
    borderRadius:10,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:40,
    backgroundColor:'#B32120',
    marginHorizontal:30
  },
  SignUpText:{
    color:"#B32120",
    fontSize:15,
    textDecorationLine: 'underline'
  }
});
