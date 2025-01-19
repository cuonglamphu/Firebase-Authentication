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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }: { navigation: any }) {
    const { setToken, setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const Login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                const idToken = await userCredential.user.getIdToken();
                setToken(idToken);
                setUser(userCredential.user);
                return {
                    email: userCredential.user.email,
                    message: "Login success",
                };
            } else {
                return null;
            }
        } catch (error) {
            console.log("Login error:", error);
            throw error;
        }
    };
    const handleLogin = async () => {
        const data = await Login(email, password);
        if (data) {
            navigation.replace("Main", {
                screen: "Home",
            });
        } else {
            setError("Email or password is incorrect");
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
                <Text style={styles.welcomeText}>Welcome back!</Text>
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
            </View>

            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => console.log("Forgot password")}
            >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
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

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}> Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.signupLink}>Sign up now</Text>
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
    forgotPassword: {
        alignItems: "flex-end",
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: "#666",
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signupContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    signupText: {
        color: "#666",
        fontSize: 14,
    },
    signupLink: {
        color: "#007AFF",
        fontSize: 14,
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
        marginTop: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
});
