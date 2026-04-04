import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={210}
          color="#808080"
          name="magnifyingglass"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          About the Team
        </ThemedText>
      </ThemedView>
      <ThemedText>
        Meet the developers behind this app. Tap each section to reveal their
        role, responsibilities, and contributions.
      </ThemedText>

      <Collapsible title="Vinay Sriramineni">
        <ThemedText style={styles.sectionText}>
          Role: Backend Developer
        </ThemedText>
        <ThemedText style={styles.sectionText}>
          Focused on the visual design, flows, and accessible user
          experience. Worked on the onboarding, benefit cards, and polished
          interactions.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Benito Sanchez">
        <ThemedText style={styles.sectionText}>Role: Frontend Developer & Designer</ThemedText>
        <ThemedText style={styles.sectionText}>
          Built the main navigation, data screens, and responsive layout for
          both mobile and web. Implemented the about page and developer info
          sections.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Victor Acosta">
        <ThemedText style={styles.sectionText}>
          Role: Backend Developer
        </ThemedText>
        <ThemedText style={styles.sectionText}>
          Designed the data structure for features like provider lookup,
          requests, and plan details. Connected app flows and ensured smooth
          cross-platform behavior.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -50,
    left: 200,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sectionText: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
  },
});
