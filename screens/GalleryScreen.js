import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { loggout, removePicture } from "../reducers/user";

export default function GalleryScreen({navigation}) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const photosData = user.picture;
    const photos = photosData.map((data, id) => {
        return (
            <View style={styles.photoContainer} key={id}>
            <FontAwesome name="times" size={20} style={{textAlign: "right", marginBottom: 10}} onPress={() => dispatch(removePicture(data))}/>
            <Image source={{ 
                uri:data
                }} 
                style={{width: "100%", height: "100%"}}/>
            </View>
        )
    });

    const handlPress = () => {
        dispatch(loggout());
        navigation.navigate('Home');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Gallery</Text>
            <View style={styles.logContainer}>
            <Text style= {{fontWeight: 'bold'}}>Logged as: {user.mail}</Text>
            <TouchableOpacity onPress={() => handlPress() }>
            <FontAwesome name="window-close" size={40}/>
            </TouchableOpacity>
            </View>
            <View style={styles.imgContainer}>
                {photos}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
    },
    photoContainer: {
        width: '40%',
        height: '25%',
        margin: 15, 
        marginBottom: 30,
    },
    imgContainer: {
        width:'90%',
        height: "80%",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    logContainer: {
        flexDirection: "row",
        width: '55%',
        justifyContent: "space-around",
        alignItems: "center"
    }

})