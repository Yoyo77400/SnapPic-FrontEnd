import { View, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType, FlashMode } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from "react-redux";
import { addPicture } from "../reducers/user";

export default function SnapScreen() {
    const isFocused = useIsFocused();
    const [hasPermission, setHasPermission] = useState(false);
    let cameraRef = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const dispatch = useDispatch();
    const [flash, setFlash] = useState(FlashMode.off);
    
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const flashMode = () => {
        setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off)
    }
    const takePicture = async () => {
        const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
        const formData = new FormData();
        formData.append('photoFromFront', {
            uri: photo.uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        fetch('https://snap-pic-back-end.vercel.app/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => data.result && dispatch(addPicture(data.url)))
    }

    if (!hasPermission || !isFocused) {
        return <View></View>
    }

    return (
        <Camera ref={(ref) => cameraRef = ref} type={type} style={styles.container} flashMode={flash}>
            <View style={styles.iconTopContainer}>
                <FontAwesome name="rotate-right" style={styles.turnButton} size={30} onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)} />
                <FontAwesome name="flash" color={flash === FlashMode.on ? 'yellow' : 'white'} size={30} onPress={() => flashMode()} />
            </View>
            <FontAwesome name="circle-thin" size={90} style={styles.pictureButton} onPress={() => takePicture()} />
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center"
    },
    iconTopContainer: {
        flex: 0.15,
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    turnButton: {
        color: "white",
    },
    flashButtonOff: {
        color: "white",
    },
    flashButtonOn: {
        color: "yellow"
    },
    pictureButton: {
        color: "white",
        marginBottom: 15
    }
})