import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
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
import { Button, Content } from 'native-base';
export default function LogInScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {

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
           />
        </View>
        <View style={styles.inputView}>
          <PasswordIcon/>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholderTextColor = {"#ebeff5"}
            placeholder="Password"
           />
        </View>
        
        <View>

        </View>
          <Button style={styles.loginBtn}>
            <Text style={{color:"#FFF"}}>LOGIN</Text>
          </Button> 
       
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
          <Text style={styles.SignUpText}>Create New Account</Text>
        </TouchableOpacity>


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
