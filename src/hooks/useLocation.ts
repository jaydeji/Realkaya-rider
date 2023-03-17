import * as Location from 'expo-location';
import { snack } from 'lib/snack';
import { useMutation } from 'react-query';
import { useAppStore } from 'store';

const getPlainLocation = (location: Location.LocationObject) => {
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
};

const getLocation = async () => {
  //getting location here is slow
  let { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    snack('Location permission denied');
    throw new Error('Location permission denied');
  }
  snack(status);

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  snack('[dev] Location permission granted');

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
