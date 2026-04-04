import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function BenefitsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FAF9F6", dark: "#000000" }}
      headerImage={
        <ThemedView
          style={styles.titleContainer}
          lightColor="#FAF9F6"
          darkColor="#3d00f3"
        >
          <ThemedText type="title" style={styles.headerTitle}>
            Your Benefits
          </ThemedText>
          <ThemedText type="subtitle" style={styles.headerSubtitle}>
            Comprehensive coverage details and plan information
          </ThemedText>
        </ThemedView>
      }
    >
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Network Information</ThemedText>
        <TouchableOpacity
          style={styles.networkCardBlue}
          onPress={() => router.push("../request")}
        >
          <ThemedText style={styles.networkTitle}>
            In-Network Providers
          </ThemedText>
          <ThemedText style={styles.networkTitle}>
            (Click to View)
          </ThemedText>
          <ThemedText style={styles.networkText}>
            Access our over 10,000 healthcare providers and 500+ hospitals
            nationwide and find help in your area.
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Coverage Overview</ThemedText>
        <ThemedView style={styles.benefitCard}>
          <ThemedText style={styles.benefitTitle}>Hospital Services</ThemedText>
          <ThemedText style={styles.benefitText}>
            Primary care visits, specialist consultations, and normal checkups
            with trusted providers.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.benefitCard}>
          <ThemedText style={styles.benefitTitle}>Urgent Care</ThemedText>
          <ThemedText style={styles.benefitText}>
            Access to urgent care centers for non-emergency medical needs, with
            coverage for visits and treatments.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.benefitCard}>
          <ThemedText style={styles.benefitTitle}>Emergency Room</ThemedText>
          <ThemedText style={styles.benefitText}>
            Comprehensive information for emergency room visits, including
            ambulance services and emergency procedures.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.benefitCard}>
          <ThemedText style={styles.benefitTitle}>
            Psychiatrist Services
          </ThemedText>
          <ThemedText style={styles.benefitText}>
            Details on mental health coverage, including psychiatrist
            consultations, therapy sessions, and mental health resources.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.benefitCard}>
          <ThemedText style={styles.benefitTitle}>Dentist Services</ThemedText>
          <ThemedText style={styles.benefitText}>
            Information about dental checkups, cleanings, and basic procedures.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
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
  section: {
    gap: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  benefitCard: {
    borderRadius: 16,
    padding: 18,
    gap: 8,
    backgroundColor: "#FAF9F6",
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  benefitText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1d2027",
  },
  detailCard: {
    borderRadius: 16,
    padding: 18,
    gap: 6,
    backgroundColor: "#FAF9F6",
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
  },
  detailText: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "500",
  },
  networkCard: {
    borderRadius: 16,
    padding: 18,
    gap: 8,
    backgroundColor: "#FAF9F6",
  },
  networkCardBlue: {
    borderRadius: 16,
    padding: 18,
    gap: 8,
    backgroundColor: "#aafffb",
    borderWidth: 2,
    borderColor: "#1D4ED8",
    shadowColor: "#1D4ED8",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 8,
  },
  networkTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  networkSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1D4ED8",
  },
  networkText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#0d0b0b",
  },
});
