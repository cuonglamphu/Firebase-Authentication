import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from "react-native";
import { useEffect, useRef } from "react";

export default function HomeScreen({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) {
    // Xử lý dữ liệu từ navigation params
    const { data, message } = route.params || {};
    const email = data?.email || route.params?.email || "User";

    // Animation
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.welcomeCard,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }],
                    },
                ]}
            >
                <Image
                    source={{
                        uri: "https://cuongday.com/_next/image?url=%2Fimages%2Favatar.png&w=256&q=100",
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.welcomeTitle}>
                    🎉 {message || "Welcome back!"}
                </Text>
                <Text style={styles.welcomeEmail}>{email}</Text>
                <Text style={styles.welcomeMessage}>How are you doing?</Text>
            </Animated.View>

            <TouchableOpacity
                style={styles.protectedButton}
                onPress={() => navigation.navigate("Profile")}
            >
                <Text style={styles.buttonText}>View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => navigation.navigate("Login")}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        paddingBottom: 80,
    },
    welcomeCard: {
        backgroundColor: "#f8f9fa",
        borderRadius: 15,
        padding: 20,
        alignItems: "center",
        marginTop: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        width: "100%",
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },
    welcomeEmail: {
        fontSize: 16,
        color: "#666",
        marginBottom: 15,
    },
    welcomeMessage: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        lineHeight: 24,
    },
    protectedButton: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "#dc3545",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
