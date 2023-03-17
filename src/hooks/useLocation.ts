import * as Location from 'expo-location';
import { snack } from 'lib/snack';
import { Platform } from 'react-native';
import { useMutation } from 'react-query';
import { useAppStore } from 'store';

const getPlainLocation = (location: Location.LocationObject) => {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    snack('Location permission denied');
    throw new Error('Location permission denied');
  }

  let location;
  location = await Location.getLastKnownPositionAsync();

  if (!location)
    location = await Location.getCurrentPositionAsync({
      accuracy:
        Platform.OS === 'android'
          ? Location.Accuracy.Low
          : Location.Accuracy.Lowest,
    });

  return location;
};

export const useLocation = ({
  onSuccess,
}: {
  onSuccess?: (data: ReturnType<typeof getPlainLocation>) => void;
}) => {
  const setLocation = useAppStore((store) => store.setLocation);

  const { mutate, isLoading, data } = useMutation({
    mutationFn: getLocation,
    onSuccess: (data) => {
      const plain = getPlainLocation(data);
      setLocation({ ...plain, heading: data.coords.heading });
      onSuccess?.(plain);
    },
  });

  return {
    getLocation: mutate,
    location: data ? getPlainLocation(data) : undefined,
    fullLocation: data,
    isLoading,
  };
};
