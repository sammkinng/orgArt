import React ,{useState,useContext} from 'react';
import { View,StyleSheet,Text,TextInput,ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'
import {COLORS} from'../constants'
import Icon from 'react-native-vector-icons/FontAwesome'
import storage from '@react-native-firebase/storage';
import {AuthContext} from '../navigation/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';
import {icons} from '../constants'

const QuestionScreen=({navigation})=>{
  const [loading,setLoading]=useState(false)
  const [qstatement,setQstatement]=useState()
  const {user}=useContext(AuthContext)
  const [image, setImage] = useState(null);
  const selectFile = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      });
  }
  const subQues = async () => {
    setLoading(true)
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    firestore()
    .collection('Questions')
    .add({
      answers: [],
      img: imageUrl,
      postTime: firestore.Timestamp.fromDate(new Date()),
      upVotes: 0,
      ques: qstatement,
      userId:user.uid
    })
    .then(() => {
      console.log('Question Added!');
      Snackbar.show({
        text: 'Question Posted Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
      setLoading(false)
      navigation.goBack()
    })
    .catch((error) => {
      console.log('Something went wrong with added ques to firestore.', error);
    });
  }
  const uploadImage = async (item) => {
    if( image == null ) {
      return null;
    }
    const storageRef = storage().ref(`photos/${Date.now()+''}`);
    const task = storageRef.putFile(image);
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });
    try {
      await task;
      const url = await storageRef.getDownloadURL();
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  }
  return(
    <View style={styles.container}>
      {loading?<ActivityIndicator size='large' color={COLORS.primary} />:
        <View style={{width:'100%',alignItems:'center',padding:20}}>
          <TouchableOpacity
            style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: COLORS.primary,position:'absolute',left:0 }}
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
        <Text style={{fontSize:18,color:COLORS.primary}}>
            Ask a Question
        </Text>
        <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"Enter your Question."}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onChangeText={(s)=>setQstatement(s)}
        />
        {image != null ? (
          <Image 
          source={{uri:image}}
          resizeMode="cover"
          style={{
              width: 250,
              height: 250,
              borderRadius: 15,
              borderWidth:2,
              marginBottom:15,
              borderColor:COLORS.primary
          }}/>
        ) : null}
        <Icon.Button
          name="paperclip"
          backgroundColor={COLORS.primary}
          onPress={()=>{selectFile()}}
        >
          Add Images
        </Icon.Button>
        <TouchableOpacity onPress={()=>subQues()} style={styles.sub}>
          <Text style={{color:'#fff',fontSize:18}}>
            Post Question
          </Text>
        </TouchableOpacity>
    </View>
      }
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    backgroundColor:COLORS.gray,
    padding:20
  },
  TextInputStyleClass:{
    textAlign: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 20 ,
    backgroundColor : "#FFFFFF",
    height: 150,
    width:'100%',
    marginTop:18,
    marginBottom:30
  },
  sub:{
    backgroundColor:COLORS.primary,
    width:'100%',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30
  }
})

export default QuestionScreen;