import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";

import { withNavigation } from "react-navigation";

import api from "./../services/api";

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpot() {
            const response = await api.get("/spots", {
                params: { tech }
            });

            setSpots(response.data);
        }

        loadSpot();
    }, []);

    function handleNavigate(id) {
        navigation.navigate("Book", { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Empresas que usam <Text style={styles.bold}>{tech}</Text>
            </Text>

            <FlatList
                Style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.thumbnail_url }}
                        />

                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>
                            {item.price ? `${item.price}/dia` : "GRATUITO"}
                        </Text>
                        <TouchableOpacity style={styles.button}>
                            <Text
                                style={styles.buttonText}
                                onPress={() => handleNavigate(item._id)}
                            >
                                Solicitar Reserva
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: "#444",
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: "bold"
    },

    list: {
        paddingHorizontal: 20
    },

    listItem: {
        // marginLeft: 20
        marginHorizontal: 20
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: "cover",
        borderRadius: 2
    },

    company: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10
    },

    price: {
        fontSize: 15,
        color: "#999",
        marginTop: 2
    },

    button: {
        height: 32,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 15
    }
});

export default withNavigation(SpotList);
