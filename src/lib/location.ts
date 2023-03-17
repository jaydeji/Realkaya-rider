import * as Location from 'expo-location';

// https://stackoverflow.com/questions/60696365/the-best-way-of-tracking-location-in-background-using-react-native-expo-in-202
export const LOCATION_TRACKING = 'location-tracking';

export const stopLocationTask = () => {
  Location.hasStartedLocationUpdatesAsync(LOCATION_TRACKING).then((value) => {
    if (value) {
      Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
    }
  });
};
