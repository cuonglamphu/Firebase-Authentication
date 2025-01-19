import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavbarProps {
    navigation: any;
    activeRoute: string;
}

export default function CustomNavbar({ navigation, activeRoute }: NavbarProps) {
    const navItems = [
        { name: "Home", icon: "home", label: "Home" },
        { name: "Profile", icon: "person", label: "Profile" },
    ];

    const handleNavigation = (screenName: string) => {
        navigation.navigate("Main", {
            screen: screenName,
        });
    };

    return (
        <View style={styles.navbar}>
            {navItems.map((item) => (
                <TouchableOpacity
                    key={item.name}
                    style={styles.navItem}
                    onPress={() => handleNavigation(item.name)}
                >
                    <Ionicons
                        name={
                            activeRoute === item.name
                                ? item.icon
                                : `${item.icon}-outline`
                        }
                        size={24}
                        color={activeRoute === item.name ? "#007AFF" : "#666"}
                    />
                    <Text
                        style={[
                            styles.navText,
                            activeRoute === item.name && styles.activeNavText,
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: "#666",
    },
    activeNavText: {
        color: "#007AFF",
        fontWeight: "600",
    },
});
