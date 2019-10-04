import React, { useState, useEffect } from "react";
import {
    View,
    AsyncStorage,
    KeyboardAvoidingView,
    Platform,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";

import api from "./../services/api";
import logo from "./../assets/logo.png";
import { bold } from "ansi-colors";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [techs, setTechs] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("use").then(user => {
            if (user) {
                navigation.navigate("List");
            }
        });
    }, []);

    async function handleSubmit() {
        const response = await api.post("/sessions", {
            email
        });

        const { _id } = response.data;

        await AsyncStorage.setItem("use", _id);
        await AsyncStorage.setItem("techs", techs);

        navigation.navigate("List");
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>Seu email*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.label}>Tecnologias</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Encontrar Spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    },

    button: {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },

    form: {
        alignSelf: "stretch",
        paddingHorizontal: 8,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    label: {
        fontWeight: "bold",
        color: "#444",
        marginBottom: 8
    }
});
