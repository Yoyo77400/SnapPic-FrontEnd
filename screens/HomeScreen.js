import { View, Text, StyleSheet, ImageBackground, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserMail, loggout } from "../reducers/user";

export default function HomeScreen({navigation}) {
    const user = useSelector((state)=> state.user.value)

    useEffect(() => {
        if(user.mail !== ''){
            navigation.navigate('TabNavigator', {screen: 'Gallery'});
        }
    }, [])
    

    const dispatch = useDispatch();
    const [mail, setMail] = useState('');
    const [error, setError] = useState(false)
    function validateEmail(email){
        var emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
        var valid = emailReg.test(email);
        if(!valid) {
            return false;
        } else {
            return true;
        }
    }

    const handlePress = () => {
        if(!validateEmail(mail)){
            setError(true)
        } else {
            navigation.navigate('TabNavigator', {screen: 'Gallery'});
            dispatch(addUserMail(mail));
            setError(false);
        }
        setMail('');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.images1}>
                <ImageBackground source={require('../assets/photo.png')} resizeMode="cover" style={styles.images2} imageStyle={{ opacity: 0.8 }}>
                    <Text style={styles.title}>SnapPic</Text>
                    <View style= {styles.registerContainer}>
                        <TextInput style={styles.input} placeholder="Email" onChangeText={(value) => setMail(value)} value={mail}/>
                        {error && <Text style={styles.error}>Veuillez entrez un mail valide!</Text>}
                        <Pressable style={styles.button} onPress={() => handlePress()}>
                            <Text style={styles.textButton}>Go to Gallery</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    images1: {
        width: '100%',
        height: '100%',
    },
    images2: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "space-around"
    },
    title: {
        fontSize: 60,
        fontWeight: "bold",
        textShadowColor: '#5df',
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        color: 'white',
        marginBottom: 50
    }, 
    registerContainer:{
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: "space-between", 
        borderRadius: 10,
        marginBottom: 100
    },
    input: {
        width: '100%',
        fontSize: 16,
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        paddingBottom: 5
    }, 
    button: {
        width: '100%',
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#07bdae',
        marginTop: 20
    },
    textButton: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "bold"
    },
    error: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#ff0000',
        marginBottom: 20, 
        textAlign: 'left'
    },
})