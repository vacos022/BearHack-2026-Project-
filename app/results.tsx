import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native"; // ← add this

export default function ResultsScreen() {
  const { results } = useLocalSearchParams();
  const data = results ? JSON.parse(results as string) : [];

  const formatResults = () => {
    return data.map((loc: any, index: number) => (
      <Text key={index} style={{ marginBottom: 10 }}>
        {index + 1} {loc.name}{"\n"}
        Distance: {loc.distance} miles{"\n"}
        Phone: {loc.phone}{"\n"}
        Hours: {loc.hours || "Hours unavailable"}
      </Text>
    ));
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20 }}>
        Nearby In-Network Locations
      </Text>
      {formatResults()}
    </ScrollView>
  );
}