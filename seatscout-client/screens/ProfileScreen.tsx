import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Animated,
    RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import config from "../config/config";

interface UserProfile {
    name: string;
    email: string;
    avatar: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
}

function SkeletonLoader() {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.7],
    });

    return (
        <ScrollView style={styles.container}>
            {/* Skeleton Header */}
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Animated.View
                        style={[styles.skeletonAvatar, { opacity }]}
                    />
                </View>
                <Animated.View
                    style={[styles.skeletonText, { opacity, width: 150 }]}
                />
                <Animated.View
                    style={[
                        styles.skeletonText,
                        { opacity, width: 200, marginTop: 8 },
                    ]}
                />
            </View>

            {/* Skeleton Stats */}
            <View style={styles.statsContainer}>
                {[1, 2, 3].map((_, index) => (
                    <React.Fragment key={index}>
                        <View style={styles.statItem}>
                            <Animated.View
                                style={[
                                    styles.skeletonText,
                                    { opacity, width: 30 },
                                ]}
                            />
                            <Animated.View
                                style={[
                                    styles.skeletonText,
                                    { opacity, width: 60, marginTop: 5 },
                                ]}
                            />
                        </View>
                        {index < 2 && <View style={styles.statDivider} />}
                    </React.Fragment>
                ))}
            </View>

            {/* Skeleton Menu Items */}
            <View style={styles.menuContainer}>
                {[1, 2, 3, 4].map((_, index) => (
                    <View key={index} style={styles.menuItem}>
                        <View style={styles.menuItemContent}>
                            <Animated.View
                                style={[styles.skeletonIcon, { opacity }]}
                            />
                            <View style={styles.menuItemText}>
                                <Animated.View
                                    style={[
                                        styles.skeletonText,
                                        { opacity, width: 120 },
                                    ]}
                                />
                                <Animated.View
                                    style={[
                                        styles.skeletonText,
                                        { opacity, width: 180, marginTop: 5 },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>

            {/* Skeleton Logout Button */}
            <Animated.View style={[styles.skeletonLogoutButton, { opacity }]} />
        </ScrollView>
    );
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
    const { token, setToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${config.baseUrl}/user/profile`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log("data", data);
            setProfile(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setToken(null);
        navigation.navigate("Login");
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUserProfile().finally(() => setRefreshing(false));
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons
                    name="alert-circle-outline"
                    size={50}
                    color="#FF3B30"
                />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                    style={styles.retryButton}
                    onPress={fetchUserProfile}
                >
                    <Text style={styles.retryButtonText}>Try again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!profile) {
        return null;
    }

    const menuItems = [
        {
            icon: "person-outline",
            title: "Personal information",
            subtitle: "Update your personal information",
            action: () => navigation.navigate("EditProfile"),
        },
        {
            icon: "notifications-outline",
            title: "Notifications",
            subtitle: "Manage your notifications",
            action: () => navigation.navigate("Notifications"),
        },
        {
            icon: "shield-outline",
            title: "Security",
            subtitle: "Set up security and privacy",
            action: () => navigation.navigate("Security"),
        },
        {
            icon: "help-circle-outline",
            title: "Help & Support",
            subtitle: "Contact us when you need help",
            action: () => navigation.navigate("Help"),
        },
    ];

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#007AFF"]}
                    tintColor="#007AFF"
                />
            }
        >
            {/* Header Profile Section */}
            <View style={styles.header}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: profile.avatar }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.email}>{profile.email}</Text>
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{profile.stats.posts}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {profile.stats.followers}
                    </Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                        {profile.stats.following}
                    </Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={item.action}
                    >
                        <View style={styles.menuItemContent}>
                            <View style={styles.menuItemIcon}>
                                <Ionicons
                                    name={item.icon as any}
                                    size={24}
                                    color="#007AFF"
                                />
                            </View>
                            <View style={styles.menuItemText}>
                                <Text style={styles.menuItemTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.menuItemSubtitle}>
                                    {item.subtitle}
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color="#C8C8C8"
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F2F7",
    },
    header: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E5E5",
    },
    profileContainer: {
        position: "relative",
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#fff",
    },
    editAvatarButton: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#007AFF",
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#666",
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 15,
        marginTop: 10,
        justifyContent: "space-around",
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
    },
    statLabel: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
    statDivider: {
        width: 1,
        backgroundColor: "#E5E5E5",
    },
    menuContainer: {
        marginTop: 10,
    },
    menuItem: {
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 1,
    },
    menuItemContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    menuItemIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F2F2F7",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    menuItemText: {
        flex: 1,
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    menuItemSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        marginBottom: 30,
        padding: 15,
    },
    logoutText: {
        color: "#FF3B30",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F7",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2F2F7",
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        fontSize: 16,
        color: "#666",
        textAlign: "center",
    },
    retryButton: {
        marginTop: 20,
        backgroundColor: "#007AFF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    skeletonAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E9EE",
    },
    skeletonText: {
        height: 20,
        borderRadius: 4,
        backgroundColor: "#E1E9EE",
        marginVertical: 3,
    },
    skeletonIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E1E9EE",
        marginRight: 15,
    },
    skeletonLogoutButton: {
        height: 50,
        backgroundColor: "#E1E9EE",
        marginTop: 20,
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10,
    },
});
