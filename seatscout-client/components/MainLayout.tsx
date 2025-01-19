import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomNavbar from "./CustomNavbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>
            <CustomNavbar navigation={navigation} activeRoute={route.name} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        paddingBottom: 60, // Space for navbar
    },
});
