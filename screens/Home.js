
import React, { useEffect ,useState,useContext} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { images, icons, COLORS, SIZES } from '../constants';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider'

const Home = ({ navigation }) => {
    const {user}=useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [fav,setFav]=useState([]);
    const [plants, setPlants] = useState([]);
    const getPlants=async()=>{
        try {
            await firestore()
            .collection('Plants')
            .onSnapshot(querySnapshot => {
            const plants = [];
        
            querySnapshot.forEach(documentSnapshot => {
                plants.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
                });
            });
            setPlants(plants);
            }); 
        } catch (e) {
            console.log(e)
        }
    }
    const getFav=async()=>{
        try {
            await firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
            setFav(documentSnapshot.data().favPlants)
        })
        } catch (e) {
            console.log(e)
        }
        
    }
    const setFavs=async(arr)=>{
        try {
            await firestore()
            .collection('users')
            .doc(user.uid)
            .update({
                favPlants:arr
            })
            .then(() => {
              console.log('Info updated!');
            });
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getPlants()
        getFav()
        setLoading(false);
    }, []);
    if (loading) {
        return <ActivityIndicator />;
    }
    // Render

    function renderNewPlants(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: SIZES.base }}>
                <Image
                    source={{uri:item.img}}
                    resizeMode="cover"
                    style={{
                        width: SIZES.width * 0.23,
                        height: '82%',
                        borderRadius: 15
                    }}
                />

                <View
                    style={{
                        position: 'absolute',
                        bottom: '17%',
                        right: 0,
                        backgroundColor: COLORS.primary,
                        paddingHorizontal: SIZES.base,
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10,
                    }}
                >
                    <Text style={{ color: COLORS.white }}>{item.name}</Text>
                </View>

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: 7,
                    }}
                    onPress={() => { 
                        if(fav.includes(index)){
                            let arr=[...fav]
                            // console.log(arr,'removing',index)
                            let v=arr.indexOf(index)
                            arr.splice(v,1)
                            setFav(arr)
                            setFavs(arr)
                        }else{
                            let arr=[...fav]
                            // console.log(arr,'adding',index)
                            arr.push(index)
                            setFav(arr)
                            setFavs(arr)
                        }
                    }}
                >
                    <Image
                        source={fav.includes(index) ? icons.heartRed : icons.heartGreenOutline}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <View style={styles.container}>
            {/* New Plants */}
            <View style={{ height: "30%", backgroundColor: COLORS.white }}>
                <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    backgroundColor: COLORS.primary
                }}>
                    <View style={{ marginTop: SIZES.padding * 2, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLORS.white }}>Explore New Plants</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('UserProfileScreen')}
                            >
                                <Image
                                    source={icons.user}
                                    resizeMode="contain"
                                    style={{
                                        width: 20,
                                        height: 20
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: SIZES.base }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={plants}
                                // keyExtractor={item => item.id.toString()}
                                renderItem={({ item, index }) => renderNewPlants(item, index)}
                            />
                        </View>
                    </View>
                </View>
            </View>

            {/* Today's Share */}
            <View style={{ height: "50%", backgroundColor: COLORS.lightGray }}>
                <View style={{
                    flex: 1,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                    backgroundColor: COLORS.white
                }}>
                    <View style={{ marginTop: SIZES.font, marginHorizontal: SIZES.padding }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLORS.secondary }}>Today's Share</Text>

                            <TouchableOpacity
                                onPress={() => { console.log("See All on pressed") }}
                            >
                                <Text style={{ color: COLORS.secondary }}>See All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', height: "88%", marginTop: SIZES.base }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant5}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flex: 1, marginTop: SIZES.font }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant6}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1.3 }}>
                                <TouchableOpacity
                                    style={{ flex: 1, marginLeft: SIZES.font }}
                                    onPress={() => { navigation.navigate("PlantDetail") }}
                                >
                                    <Image
                                        source={images.plant7}
                                        resizeMode="cover"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 20
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: "20%", backgroundColor: COLORS.lightGray }}>
                <View style={{
                    flex: 1,
                    backgroundColor: COLORS.lightGray,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('WebScreen')}>
                        <Text style={{color:COLORS.primary,fontWeight:'bold',fontSize:18,marginTop:23}}>
                        Ready to enter a whole new World?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('QuestionScreen')}>
                        <Text>Have any Questions?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Home;
