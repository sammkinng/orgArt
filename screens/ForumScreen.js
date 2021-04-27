import React ,{useState,useEffect,useContext} from 'react';
import { View,StyleSheet,RefreshControl,FlatList,ActivityIndicator } from 'react-native';
import {COLORS} from '../constants'
import PostCard from '../components/PostCard';
import firestore from '@react-native-firebase/firestore'

const ForumScreen=({navigation})=>{
    const [loading,setLoading]=useState(false)
    const [posts,setPosts]=useState(null)
    const fetchPosts = async () => {
        try {
          const list = [];
          const od={}
          await firestore()
            .collection('Questions')
            .orderBy('postTime', 'desc')
            .get()
            .then((querySnapshot) => {
              // console.log('Total Posts: ', querySnapshot.size);
    
              querySnapshot.forEach((doc) => {
                const {
                  img,
                  postTime,
                  upVotes,
                  ques,
                  userId
                } = doc.data();
                list.push({
                  id: doc.id,
                  userName: 'Test Name',
                  postTime: postTime,
                  ques,
                  img,
                  upVotes,
                  userId,
                });
                od[doc.id]=upVotes
              });
            });
    
          setPosts(list);
          if (loading) {
            setLoading(false);
          }
        } catch (e) {
          console.log(e);
        }
    };
    useEffect(() => {
    fetchPosts();
    }, []);
    return(
        <View style={styles.container}>
            {loading?(<ActivityIndicator size='large' color={COLORS.primary} />):
            (
                <View style={{width:'100%'}}>
                    <FlatList 
                        data={posts}
                        renderItem={({item})=>(
                            <PostCard 
                                item={item}
                                onPress={() =>{navigation.navigate('AnsScreen',{qid:item.id})}
                                }
                                screen={false}
                            />)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={()=>{
                                    setPosts([])
                                    fetchPosts()
                                }}
                            />
                        }   
                    />
                </View>
                )}
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // width:'100%',
        alignItems:'center',
        padding:20,
        backgroundColor:COLORS.gray,
        marginBottom:15
    }
})

export default ForumScreen;