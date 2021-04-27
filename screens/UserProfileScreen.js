import React, { useContext,useState ,useEffect} from 'react';
import { View,StyleSheet,Text, Image ,TouchableOpacity} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {icons,COLORS} from '../constants'


const UserProfileScreen=({navigation})=>{
    const {user,logout}=useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const getUser = async() => {
        await firestore()
        .collection('users')
        .doc( user.uid)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
            console.log('User Data', documentSnapshot.data());
            setUserData(documentSnapshot.data());
          }
        })
      }
    useEffect(()=>{
        getUser()
        user.providerData.forEach((userInfo) => {
            console.log('User info for provider: ',userInfo,user);
          });
    },[navigation])
    return(
        <View style={styles.container}>
            <TouchableOpacity
                style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: COLORS.primary,position:'absolute',left:20,top:20 }}
                onPress={() => { navigation.goBack() }}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20
                    }}
                />
            </TouchableOpacity>
            <View style={[styles.userImg,{backgroundColor:'#8f37ed'}]}>
                <Text style={{color:'#fff',fontSize:43}}>{userData?userData.fname.toUpperCase()[0]||'P':'P'} {userData?userData.lname.toUpperCase()[0]||'Y':'Y'}</Text>
            </View>
            <Text style={styles.userName}>
                {userData ? userData.fname || 'Test' : 'Test'} {userData ? userData.lname || 'User' : 'User'}
            </Text>
            <Text style={{marginBottom:18}}>{userData?userData.email||'TestEmail':'TestEmail'}</Text>
            <View style={styles.userBtnWrapper}>
                <TouchableOpacity style={styles.userBtn}>
                    <Text style={styles.userBtnTxt}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.userBtn} onPress={()=>logout()}>
                    <Text style={styles.userBtnTxt}>
                        Log Out
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                <Text style={styles.btxt}>
                    My Questions
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                <Text style={styles.btxt}>
                    My Addresses
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                <Text style={styles.btxt}>
                    My Payment Methods
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={()=>{}}>
                <Text style={styles.btxt}>
                    My orders
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default UserProfileScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.gray,
      padding: 20,
      alignItems:'center'
    },
    userImg: {
      height: 150,
      width: 150,
      borderRadius: 75,
      justifyContent:'center',
      alignItems:'center'
    },
    userName: {
      fontSize: 18,
      color:COLORS.primary,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
    },
    
    userBtnWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 10,
    },
    userBtn: {
      borderColor: '#2e64e5',
      borderWidth: 2,
      borderRadius: 3,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginHorizontal: 5,
    },
    userBtnTxt: {
      color: '#2e64e5',
    },
    btn:{
        width:'100%',
        height:45,
        backgroundColor:COLORS.primary,
        justifyContent:'center',
        alignItems:'center',
        marginTop:28,
        borderRadius:7
    },
    btxt:{
        color:  COLORS.white,
        fontSize:18,
    }
  });