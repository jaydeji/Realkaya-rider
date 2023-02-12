import * as Location from 'expo-location';
import { snack } from 'lib/snack';
import { useMutation } from 'react-query';

const getPlainLocation = (location?: Location.LocationObject) => {
  if (!location) return location;
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

const getLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    snack('Permission to access location was denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});

  return location;
};

export const useLocation = ({
  onSuccess,
}: {
  onSuccess?: (data: ReturnType<typeof getPlainLocation>) => void;
}) => {
  const { mutate, isLoading, data } = useMutation({
    mutationFn: getLocation,
    onSuccess: (data) => onSuccess?.(getPlainLocation(data)),
  });

  return {
    getLocation: mutate,
    location: getPlainLocation(data),
    fullLocation: data,
    isLoading,
  };
};
