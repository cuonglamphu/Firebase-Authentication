import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/MainLayout";

const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

function MainNavigator() {
    return (
        <MainLayout>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen name="Home" component={HomeScreen} />
                <MainStack.Screen name="Profile" component={ProfileScreen} />
            </MainStack.Navigator>
        </MainLayout>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Main" component={MainNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
}
