import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, Alert  } from "react-native";
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';
import { router } from 'expo-router';
import * as Location from "expo-location";
import { useEffect } from "react";
import useLocationStore from "@/store/locationStore";


export default function HomeScreen() {

  const setLocation = useLocationStore((s) => s.setLocation);

  const accent1 = useThemeColor({}, 'accent1');
  const accent2 = useThemeColor({}, 'accent2');
  const surface = useThemeColor({}, 'surface');
  const background = useThemeColor({}, 'background');
  const glow = useThemeColor({}, 'glow');
  const textColor = useThemeColor({}, 'text');

    useEffect(() => {


      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Location Needed",
            "We use your location to find nearby providers. Please enable it in Settings.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Open Settings", onPress: () => Location.enableNetworkProviderAsync() }
            ]
          );
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        //console.log(location); // { coords: { latitude, longitude, ... } }
        setLocation(location); // ✅ use the store action instead
      })();
    }, [setLocation]);


  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: Colors.light.surface, dark: Colors.dark.surface }}
      headerImage={
        <ThemedView
          style={styles.headerGraphic}
          lightColor={Colors.light.surface}
          darkColor={'#6D28D9'}
        >
          <ThemedText type="title" style={styles.headerTitle}>
            Thrive
          </ThemedText>
          <ThemedText type="subtitle" style={styles.headerSubtitle}>
            Your care is our Priority!
          </ThemedText>
          <Image
            source={require("@/assets/images/boot.png")}
            style={[styles.headerImage, { width: 310, height: 310 }]}
            contentFit="contain"
          />
        </ThemedView>
      }
    >
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Welcome to your Care Hub!
        </ThemedText>

        <ThemedView style={styles.infoGrid}>
          <ThemedView style={styles.infoCard} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
            <ThemedText style={styles.cardTitle}>Find the coverage that fits you!</ThemedText>
            <ThemedText style={styles.cardText}>
              Looking for in-network hospitals and specialists? Tap the button below to start finding nearby locations that accept your insurance.
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push({ pathname: '/request' })}
              style={[styles.primaryButton, { backgroundColor: accent2, shadowColor: accent2 }]}
            >
              <ThemedText style={[styles.buttonText, { color: background }]}>Find Providers</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          What do we provide?
        </ThemedText>

        <ThemedView style={styles.detailCard} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
          <ThemedText style={styles.cardTitle}>AI Chatbot</ThemedText>
          <ThemedText style={styles.cardText}>
            Ask questions about coverage, benefits, and next steps — our AI assistant helps you understand your plan and quickly find the right care.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.detailCard} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
          <ThemedText style={styles.cardTitle}>Insurance-aware Search</ThemedText>
          <ThemedText style={styles.cardText}>
            We combine your location and insurance details to surface nearby hospitals and providers that accept your plan, so you get care that fits.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Need assistance?
        </ThemedText>
        <ThemedView style={styles.actionCard} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
          <ThemedText style={[styles.actionTitle, { color: accent2 }]}>AI Chatbot</ThemedText>
          <ThemedText style={styles.actionText}>
            Need help understanding general information about your plan or need health advice? Our AI assistant can answer questions about your health and coverage concerns. Get started below!
          </ThemedText>
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/chatScreen' })}
            style={[styles.primaryButton, { backgroundColor: accent1, shadowColor: accent1 }]}
          >
            <ThemedText style={[styles.buttonText, { color: background }]}>Start Chat</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: 170,
    position: "absolute",
  },
  headerGraphic: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 32,
  },
  headerTitle: {
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 6,
  },

  heroCard: {
    borderRadius: 20,
    padding: 20,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  infoCard: {
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  detailCard: {
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "600",
  },
  heroText: {
    fontSize: 15,
    lineHeight: 22,
  },

  section: {
    gap: 10,
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "600",
  },

  infoGrid: {
    borderRadius: 20,
    padding: 20,
    gap: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },

  actionCard: {
    borderRadius: 20,
    padding: 16,
    gap: 8,
    
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionText: {
    fontSize: 14,
    lineHeight: 20,
  },

  // Button Styles
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
