import React, { useState, useEffect ,useContext} from 'react';
import { ScrollView,View,Text, StyleSheet, TouchableOpacity, RefreshControl, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import storage from '@react-native-firebase/storage';
import { COLORS, icons } from '../constants'
import PostCard from '../components/PostCard';
import { AuthContext } from '../navigation/AuthProvider'
import Snackbar from 'react-native-snackbar';

const AnsScreen = ({ navigation, route }) => {
    var textInput
    const [posq, setPosq] = useState([])
    const [vote, setVote] = useState(0)
    const [qstatement, setQstatement] = useState()
    const { user } = useContext(AuthContext)
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
        const imageUrl = await uploadImage();
        console.log('Image Url: ', imageUrl);
        let obj={
            // id:route.params.qid,
            img: imageUrl,
            postTime: firestore.Timestamp.fromDate(new Date()),
            liked:false,
            userName:'Test User',
            upVotes: 0,
            ques: qstatement,
            userId: user.uid}
        let arr=[...posq[0].answers]
        arr.push(obj)
        firestore()
            .collection('Questions')
            .doc(route.params.qid)
            .update({
                'answers': arr
            })
            .then(() => {
                console.log('Answer Added!');
                setImage(null)
                setQstatement(null)
                // textInput.clear()
                post()
                Snackbar.show({
                    text: 'Answer Posted Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                });
            })
            .catch((error) => {
                console.log('Something went wrong with added ques to firestore.', error);
            });
    }
    const uploadImage = async (item) => {
        if (image == null) {
            return null;
        }
        const storageRef = storage().ref(`photos/${Date.now() + ''}`);
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
    const baby = async (postId) => {
        if (vote === 0 || vote === 2) {
            await firestore()
                .collection('Questions')
                .doc(postId)
                .update({
                    'upVotes': posq[0]['upVotes'] + 1,
                })
                .then(() => {
                    post()
                    console.log('User updated!');
                    setVote(1)
                });
        }
        else if (vote === 1) {
            await firestore()
                .collection('Questions')
                .doc(postId)
                .update({
                    'upVotes': posq[0]['upVotes'] - 1,
                })
                .then(() => {
                    post()
                    console.log('User updated!');
                    setVote(0)
                });
        }
    }
    const adult = async (postId) => {
        if (vote === 0 || vote === 1) {
            await firestore()
                .collection('Questions')
                .doc(postId)
                .update({
                    'upVotes': posq[0]['upVotes'] - 1,
                })
                .then(() => {
                    post()
                    console.log('User updated!')
                    setVote(2)
                });
        }
        else if (vote === 2) {
            await firestore()
                .collection('Questions')
                .doc(postId)
                .update({
                    'upVotes': posq[0]['upVotes'] + 1,
                })
                .then(() => {
                    post()
                    console.log('User updated!');
                    setVote(0)
                });
        }
    }
    const post = async () => {
        try {
            const lt = []
            await firestore()
                .collection('Questions')
                .doc(route.params.qid)
                .get()
                .then((documentSnapshot) => {
                    const {
                        answers,
                        img,
                        ques,
                        upVotes,
                        userId,
                        postTime
                    } = documentSnapshot.data()
                    lt.push({
                        id: route.params.qid,
                        userName: 'Test Name',
                        ques,
                        postTime,
                        answers,
                        liked: vote,
                        img,
                        upVotes,
                        userId,
                    })
                })
            await setPosq(lt)
            console.log('promisss')
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        post()
    }, [])
    return (
        <View style={{backgroundColor:COLORS.gray,flex:1,justifyContent:'center'}}>
            {posq.length > 0 ? (<ScrollView contentContainerStyle={styles.container} style={{marginBottom:45}} showsVerticalScrollIndicator={false}>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <TouchableOpacity
                        style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: COLORS.primary, }}
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
                </View>
                <PostCard
                    item={posq[0]}
                    upvote={baby}
                    downvote={adult}
                    screen={true}
                />
                {posq[0].answers.map(item=>(
                    <PostCard
                        item={item}
                        upvote={baby}
                        downvote={adult}
                        screen={true}
                        key={item.postTime}
                    />
                ))}
                <TextInput
                    // ref={input => { textInput = input }}
                    style={styles.TextInputStyleClass}
                    underlineColorAndroid="transparent"
                    placeholder={"Enter your Answer."}
                    placeholderTextColor={"#9E9E9E"}
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={(s) => setQstatement(s)}
                    // onSubmitEditing={(e)=>{textInput.clear()}}
                />
                {image != null ? (
                    <Image
                        source={{ uri: image }}
                        resizeMode="cover"
                        style={{
                            width: 250,
                            height: 250,
                            borderRadius: 15,
                            borderWidth: 2,
                            marginBottom: 15,
                            borderColor: COLORS.primary
                        }} />
                ) : null}
                <Icon.Button
                    name="paperclip"
                    backgroundColor={COLORS.primary}
                    onPress={() => { selectFile() }}
                >
                    Add Images
                </Icon.Button>
                <TouchableOpacity onPress={() => subQues()} style={styles.sub}>
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                        Post Answer
                    </Text>
                </TouchableOpacity>
            </ScrollView>) : (<ActivityIndicator size='large' color={COLORS.primary} />)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.gray
    },
    TextInputStyleClass: {
        textAlign: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        height: 150,
        width: '100%',
        marginTop: 18,
        marginBottom: 30
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

export default AnsScreen;