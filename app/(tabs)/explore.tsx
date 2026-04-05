import { StyleSheet } from "react-native";
import { Image } from "expo-image";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

import { Collapsible } from "@/components/ui/collapsible";
import { Fonts } from "@/constants/theme";
import { ExternalLink } from "@/components/external-link";
import { Colors } from "@/constants/theme";
import githubMark from "@/assets/images/github-mark";

export default function TabTwoScreen() {
  return (
      <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/bearhacklogo.png")}
          style={[styles.headerImage, { width: 210, height: 210 }]}
          contentFit="contain"
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
        role, responsibilities, and contributions. We would like to thank all the personnel at BearHack 2026 for the opportunity to build this project!
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
        <ExternalLink href="https://github.com/darthvinayder006" style={styles.linkWrap}>
          <ThemedView style={styles.githubButton} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
            <Image
              source={githubMark}
              style={styles.githubIcon}
              contentFit="contain"
            />
            <ThemedText style={styles.githubText}>github.com/darthvinayder006</ThemedText>
          </ThemedView>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Benito Sanchez">
        <ThemedText style={styles.sectionText}>Role: Frontend Developer & Designer</ThemedText>
        <ThemedText style={styles.sectionText}>
          Built the main navigation, data screens, and responsive layout for
          both mobile and web. Implemented the about page and developer info
          sections.
        </ThemedText>
        <ExternalLink href="https://github.com/BenSan142" style={styles.linkWrap}>
          <ThemedView style={styles.githubButton} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
            <Image
              source={githubMark}
              style={styles.githubIcon}
              contentFit="contain"
            />
            <ThemedText style={styles.githubText}>github.com/BenSan142</ThemedText>
          </ThemedView>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Victor Acosta">
        <ThemedText style={styles.sectionText}>
          Role: Backend Developer and UI/UX 
        </ThemedText>
        <ThemedText style={styles.sectionText}>
          Designed the data structure for features like provider lookup,
          requests, and plan details. Connected app flows and ensured smooth
          cross-platform behavior. As well as enhancing visuals and app transitions/animations
        </ThemedText>
        <ExternalLink href="https://github.com/vacos022" style={styles.linkWrap}>
          <ThemedView style={styles.githubButton} lightColor={Colors.light.surface} darkColor={Colors.dark.surface}>
            <Image
              source={githubMark}
              style={styles.githubIcon}
              contentFit="contain"
            />
            <ThemedText style={styles.githubText}>github.com/vacos022</ThemedText>
          </ThemedView>
        </ExternalLink>
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
  linkWrap: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  githubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  githubIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  githubText: {
    fontSize: 14,
  },
});
