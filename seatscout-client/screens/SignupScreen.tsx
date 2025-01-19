import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
export default function SignupScreen({ navigation }: { navigation: any }) {
    const { setToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const Signup = async (email: string, password: string) => {
        try {
            const newUser = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return newUser;
        } catch (error) {
            console.log(error);
            setError("Signup failed");
        }
    };

    const handleSignup = async () => {
        setError("");
        try {
            const newUser = await Signup(email, password);
            if (newUser) {
                setToken(await newUser.user.getIdToken());
                navigation.navigate("Main", {
                    screen: "Home",
                    data: { email: email },
                    message: "Welcome, you are signed up!",
                });
            } else {
                setError("Signup failed");
            }
        } catch (error) {
            console.log(error);
            setError("Signup failed");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={{
                        uri: "https://cuongday.com/_next/image?url=%2Fimages%2Favatar.png&w=256&q=100",
                    }}
                    style={styles.logo}
                />
                <Text style={styles.welcomeText}>Create Account</Text>
            </View>

            <View style={styles.inputContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm password"
                    placeholderTextColor="#666"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
            </View>

            <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
            >
                <Text style={styles.signupButtonText}>Sign up</Text>
            </TouchableOpacity>

            <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.orLine} />
            </View>

            <TouchableOpacity
                style={styles.googleButton}
                onPress={() => console.log("Google signup")}
            >
                <Image
                    source={{
                        uri: "https://th.bing.com/th/id/OIP.lsGmVmOX789951j9Km8RagHaHa?w=177&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
                    }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Sign up with Google</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.loginLink}>Login now</Text>
                </TouchableOpacity>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 100,
        marginBottom: 50,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginTop: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    signupButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    signupButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    orContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0E0E0",
    },
    orText: {
        color: "#666",
        paddingHorizontal: 10,
        fontSize: 14,
    },
    googleButton: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    loginText: {
        color: "#666",
        fontSize: 14,
    },
    loginLink: {
        color: "#007AFF",
        fontSize: 14,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
