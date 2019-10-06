import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    AsyncStorage,
    Text,
    Image,
    Platform,
    StatusBar,
    ScrollView,
    Alert
} from "react-native";

import socketio from "socket.io-client";

import SpotList from "./../components/Spot-list";

import logo from "./../assets/logo.png";

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("use").then(user_id => {
            const socket = socketio("http://10.0.0.112:3333", {
                query: { user_id }
            });

            socket.on("booking_response", booking => {
                Alert.alert(
                    `Sua reserva em ${booking.spot.company} em ${
                        booking.date
                    } foi ${booking.approved ? "APROVADA" : "REPROVADA"}`
                );
            });
        });
    }, []);

    useEffect(() => {
        AsyncStorage.getItem("techs").then(storageTecks => {
            const techArray = storageTecks.split(",").map(tech => tech.trim());

            setTechs(techArray);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => (
                    <SpotList key={tech} tech={tech} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    logo: {
        height: 42,
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: 10
    }
});
