import { create } from "zustand";
import { LocationObject } from "expo-location";

// Shape of our location store
interface LocationStore {
  location: LocationObject | null; // null until the user grants permission
  setLocation: (loc: LocationObject) => void; // call this to save the location
}

// Global store — import useLocationStore in any file to read or update location
const useLocationStore = create<LocationStore>((set) => ({
  location: null, // default: no location yet
  setLocation: (loc) => set({ location: loc }), // updates location in the store
}));

export default useLocationStore;