import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";

import { icons, COLORS, SIZES, FONTS } from '../constants'

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);

    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center',
                        alignItems:'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            tintColor:COLORS.primary
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text >{restaurant?.name}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.list}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "90%",
                                        // zIndex:-1
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text >-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text >{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text >+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 5,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center'}}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text >{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />

                                <Text style={{
                                     color: COLORS.darygray
                                }}>{item.calories.toFixed(2)} cal</Text>
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    // function renderDots() {

    //     const dotPosition = Animated.divide(scrollX, SIZES.width)

    //     return (
    //         <View style={{ height: 30 }}>
    //             <View
    //                 style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                     height: SIZES.padding
    //                 }}
    //             >
    //                 {restaurant?.menu.map((item, index) => {

    //                     const opacity = dotPosition.interpolate({
    //                         inputRange: [index - 1, index, index + 1],
    //                         outputRange: [0.3, 1, 0.3],
    //                         extrapolate: "clamp"
    //                     })

    //                     const dotSize = dotPosition.interpolate({
    //                         inputRange: [index - 1, index, index + 1],
    //                         outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
    //                         extrapolate: "clamp"
    //                     })

    //                     const dotColor = dotPosition.interpolate({
    //                         inputRange: [index - 1, index, index + 1],
    //                         outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
    //                         extrapolate: "clamp"
    //                     })

    //                     return (
    //                         <Animated.View
    //                             key={`dot-${index}`}
    //                             opacity={opacity}
    //                             style={{
    //                                 borderRadius: SIZES.radius,
    //                                 marginHorizontal: 6,
    //                                 width: dotSize,
    //                                 height: dotSize,
    //                                 backgroundColor: dotColor
    //                             }}
    //                         />
    //                     )
    //                 })}
    //             </View>
    //         </View>
    //     )
    // }

    function renderOrder() {
        return (
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 30,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text >{getBasketItemCount()} items in Cart</Text>
                        <Text >Rs {sumOrder()}</Text>
                    </View>
                    {/* <View style={{flexDirection:'row',width:'100%',marginTop:30}}> */}
                        <Text style={{fontSize:16,color:COLORS.primary,fontWeight:'bold',marginTop:10,position:'relative',left:20}}>
                            Deliver to:
                        </Text>
                        <Text style={{position:'relative',left:20}}>
                            Vill:Khera alampur, Rewari,123035, near shiv mandir
                        </Text>
                    {/* </View> */}
                    <TouchableOpacity style={{width:200,height:50,backgroundColor:COLORS.gray,borderRadius:25,justifyContent:'center',alignItems:'center',marginTop:30,position:'relative',left:100}}>
                        <Text style={{}}>
                            Change Delivery Address
                        </Text>
                    </TouchableOpacity>
                    {/* Order Button */}

                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                            onPress={() => {alert('Your Order has been Placed')
                            navigation.goBack()
                        }}
                        >
                            <Text style={{ color: COLORS.white}}>Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Restaurant;