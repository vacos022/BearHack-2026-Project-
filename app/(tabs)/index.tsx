import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, Alert  } from "react-native";
import { router } from 'expo-router';
import * as Location from "expo-location";
import { useEffect } from "react";
import useLocationStore from "@/store/locationStore";


export default function HomeScreen() {

  const setLocation = useLocationStore((s) => s.setLocation);

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
      headerBackgroundColor={{ light: "#FAF9F6", dark: "#000000" }}
      headerImage={
        <ThemedView
          style={styles.headerGraphic}
          lightColor="#FAF9F6"
          darkColor="#994700"
        >
          <ThemedText type="title" style={styles.headerTitle}>
            Thrive
          </ThemedText>
          <ThemedText type="subtitle" style={styles.headerSubtitle}>
            Your care is our Priority
          </ThemedText>
          <Image
            source={require("@/assets/images/boot.png")}
            style={[styles.headerImage, { width: 310, height: 310 }]}
            contentFit="contain"
          />
        </ThemedView>
      }
    >
      <ThemedView style={styles.heroCard}>
        <ThemedText type="title" style={styles.heroTitle}>
          Welcome to your care hub
        </ThemedText>
        <ThemedText style={styles.heroText}>
          A clean place to review hospital coverage summaries, plan highlights,
          and support resources. Your benefits are organized for easy access.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Coverage Snapshot
        </ThemedText>

        <ThemedView style={styles.infoGrid}>
          <ThemedView style={styles.infoCard}>
            <ThemedText style={styles.cardTitle}>Inpatient Care</ThemedText>
            <ThemedText style={styles.cardText}>
              Hospital stays, surgery coverage, and specialist consultations
              with trusted providers.
            </ThemedText>
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/request',
              })}
              style={styles.secondaryButton}
            >
              <ThemedText style={styles.secondaryButtonText}>
                Request Help Now
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Plan Highlights
        </ThemedText>

        <ThemedView style={styles.detailCard}>
          <ThemedText style={styles.cardTitle}>
            Preventive Care Included
          </ThemedText>
          <ThemedText style={styles.cardText}>
            Annual checkups, screenings, and wellness visits to keep your whole
            family healthy.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.detailCard}>
          <ThemedText style={styles.cardTitle}>Pharmacy Savings</ThemedText>
          <ThemedText style={styles.cardText}>
            Lower-cost prescriptions and support navigating formulary options.
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Need Assistance?
        </ThemedText>

        <ThemedView style={styles.actionCard}>
          <ThemedText style={styles.actionTitle}>
            Contact your care team
          </ThemedText>
          <ThemedText style={styles.actionText}>
            Call 1-800-CARE-123 or visit your network portal to check benefits,
            book appointments, and review hospital details.
          </ThemedText>
          <TouchableOpacity style={styles.primaryButton}>
            <ThemedText style={styles.buttonText}>Get Started</ThemedText>
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
    color: "#FAF9F6",
    fontWeight: "700",
  },
  headerSubtitle: {
    marginTop: 6,
    color: "#d8d8d8",
  },

  heroCard: {
    borderRadius: 20,
    padding: 20,
    gap: 10,
    backgroundColor: "#FAF9F6",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 30,
    color: "#111111",
    fontWeight: "600",
  },
  heroText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },

  section: {
    gap: 10,
    marginTop: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#FAF9F6",
    fontWeight: "600",
  },

  infoGrid: {
    flexDirection: "row",
    gap: 12,
  },

  infoCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    gap: 6,
    backgroundColor: "#FAF9F6",
  },

  detailCard: {
    borderRadius: 16,
    padding: 16,
    gap: 6,
    backgroundColor: "#FAF9F6",
  },

  cardTitle: {
    fontSize: 16,
    color: "#111111",
    fontWeight: "600",
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6B7280",
  },

  actionCard: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    backgroundColor: "#FAF9F6",
  },
  actionTitle: {
    fontSize: 16,
    color: "#1D4ED8",
    fontWeight: "600",
  },
  actionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#374151",
  },

  // Button Styles
  primaryButton: {
    backgroundColor: "#1D4ED8",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#1D4ED8",
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
    borderColor: "#1D4ED8",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D4ED8",
  },
});
