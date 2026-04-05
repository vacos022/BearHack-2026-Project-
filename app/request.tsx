import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type Location = {
  name: string;
  distance: number;
  phone: string | null;
  hours: string[];
  covered: boolean;
  lat: number;
  lng: number;
};

export default function ResultsScreen() {
  const { results } = useLocalSearchParams<{ results: string }>();
  const router = useRouter();

  const accent1  = useThemeColor({}, "accent1");
  const surface  = useThemeColor({}, "surface");
  const text     = useThemeColor({}, "text");
  const icon     = useThemeColor({}, "icon");
  const background = useThemeColor({}, "background");

  // Parse and filter to only covered (in-network) locations
  const allLocations: Location[] = results ? JSON.parse(results) : [];
  const locations = allLocations.filter((loc) => loc.covered);

  const isOpenNow = (hours: string[]): boolean | null => {
    if (!hours || hours.length === 0) return null;
    const now   = new Date();
    const day   = now.getDay(); // 0 Sun … 6 Sat
    const hour  = now.getHours();
    const min   = now.getMinutes();

    // weekday_text is Mon-Sun order from Google (index 0 = Monday)
    const googleDay = day === 0 ? 6 : day - 1;
    const todayText = hours[googleDay] ?? "";

    if (todayText.toLowerCase().includes("open 24 hours")) return true;
    if (todayText.toLowerCase().includes("closed")) return false;

    // try to parse "Monday: 8:00 AM – 8:00 PM"
    const match = todayText.match(/(\d+):(\d+)\s*(AM|PM)\s*[–-]\s*(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return null;

    const to24 = (h: number, m: number, ampm: string) => {
      let h24 = h % 12;
      if (ampm.toUpperCase() === "PM") h24 += 12;
      return h24 * 60 + m;
    };

    const openMins  = to24(+match[1], +match[2], match[3]);
    const closeMins = to24(+match[4], +match[5], match[6]);
    const nowMins   = hour * 60 + min;

    return nowMins >= openMins && nowMins < closeMins;
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Header */}
      <ThemedView
        style={styles.header}
        lightColor={Colors.light.surface}
        darkColor="#5B21B6"
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={[styles.backArrow, { color: accent1 }]}>← Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Nearby Care</ThemedText>
        <ThemedText style={styles.headerSub}>
          {locations.length} in-network location{locations.length !== 1 ? "s" : ""} found
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.list}>
        {locations.length === 0 ? (
          <ThemedView style={[styles.emptyCard, { backgroundColor: surface }]}>
            <ThemedText style={[styles.emptyText, { color: icon }]}>
              No in-network locations found in this area.{"\n"}Try increasing your distance.
            </ThemedText>
          </ThemedView>
        ) : (
          locations.map((loc, index) => {
            const openStatus = isOpenNow(loc.hours);

            return (
              <ThemedView
                key={index}
                style={styles.card}
                lightColor={Colors.light.surface}
                darkColor={Colors.dark.surface}
              >
                {/* Number + Name row */}
                <View style={styles.nameRow}>
                  <View style={[styles.indexBadge, { backgroundColor: accent1 }]}>
                    <ThemedText style={[styles.indexText, { color: background }]}>
                      {index + 1}
                    </ThemedText>
                  </View>
                  <ThemedText type="defaultSemiBold" style={[styles.name, { color: text }]}>
                    {loc.name}
                  </ThemedText>
                </View>

                {/* Distance */}
                <View style={styles.detailRow}>
                  <ThemedText style={[styles.label, { color: icon }]}>Distance</ThemedText>
                  <ThemedText style={[styles.value, { color: text }]}>
                    {loc.distance} miles
                  </ThemedText>
                </View>

                {/* Phone */}
                <View style={styles.detailRow}>
                  <ThemedText style={[styles.label, { color: icon }]}>Phone</ThemedText>
                  <ThemedText style={[styles.value, { color: text }]}>
                    {loc.phone ?? "Unavailable"}
                  </ThemedText>
                </View>

                {/* Hours */}
                <View style={styles.detailRow}>
                  <ThemedText style={[styles.label, { color: icon }]}>Hours</ThemedText>
                  <View style={styles.hoursRight}>
                    {openStatus !== null && (
                      <View
                        style={[
                          styles.openBadge,
                          { backgroundColor: openStatus ? "#16a34a22" : "#dc262622" },
                        ]}
                      >
                        <ThemedText
                          style={[
                            styles.openText,
                            { color: openStatus ? "#16a34a" : "#dc2626" },
                          ]}
                        >
                          {openStatus ? "Open Now" : "Closed"}
                        </ThemedText>
                      </View>
                    )}
                    <ThemedText style={[styles.value, { color: text }]}>
                      {loc.hours.length > 0 ? loc.hours[0] : "Hours unavailable"}
                    </ThemedText>
                  </View>
                </View>

                {/* In-network badge */}
                <View style={[styles.coveredBadge, { borderColor: accent1 + "44" }]}>
                  <ThemedText style={[styles.coveredText, { color: accent1 }]}>
                    ✓ In-Network
                  </ThemedText>
                </View>
              </ThemedView>
            );
          })
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 56,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 8,
  },
  backBtn: {
    marginBottom: 8,
  },
  backArrow: {
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  headerSub: {
    marginTop: 4,
    fontSize: 13,
    opacity: 0.8,
  },
  list: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 4,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  indexText: {
    fontSize: 13,
    fontWeight: "700",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    flexWrap: "wrap",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    minWidth: 70,
  },
  value: {
    fontSize: 13,
    flex: 1,
    textAlign: "right",
  },
  hoursRight: {
    flex: 1,
    alignItems: "flex-end",
    gap: 4,
  },
  openBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  openText: {
    fontSize: 11,
    fontWeight: "700",
  },
  coveredBadge: {
    marginTop: 4,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  coveredText: {
    fontSize: 12,
    fontWeight: "600",
  },
  emptyCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});