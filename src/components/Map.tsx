import { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import shape from 'assets/images/Shape.png';
import MapViewDirections from 'react-native-maps-directions';
import { useAppStore, useOrderStore } from 'store';
import { Order } from 'types/app';
import { GOOGLE_MAPS_DIRECTIONS_KEY } from '@env';
import Bugsnag from '@bugsnag/expo';

type Props = {
  children?: React.ReactNode;
};

const edgePadding = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
};

const getDestination = (currentOrder?: Order) => {
  if (!currentOrder) return;
  if (!currentOrder.pickUpPickedAt)
    return {
      longitude: +currentOrder.senderLongitude,
      latitude: +currentOrder.senderLatitude,
    };
  return {
    longitude: +currentOrder.recepientLongitude,
    latitude: +currentOrder.recepientLatitude,
  };
};

export const Map = ({ children }: Props) => {
  const mapRef = useRef<MapView>(null);

  const currentOrder = useOrderStore((store) => store.currentOrder);
  const location = useAppStore((store) => store.location);

  const destination = getDestination(currentOrder);

  useEffect(() => {
    if (!currentOrder) return;
    if (location && destination) {
      return mapRef.current?.fitToCoordinates([location, destination], {
        edgePadding,
        animated: true,
      });
    }

    if (location || destination) {
      return mapRef.current?.fitToCoordinates([location! || destination!], {
        edgePadding,
        animated: true,
      });
    }
  }, [currentOrder]);

  return (
    <View className="flex-1 items-center">
      <MapView.Animated
        ref={mapRef}
        className="w-full flex-1"
        mapType={MAP_TYPES.STANDARD}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location?.latitude || 6.514577,
          longitude: location?.longitude || 3.391881,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <MapViewDirections
          origin={location}
          destination={destination}
          apikey={GOOGLE_MAPS_DIRECTIONS_KEY}
          strokeWidth={3}
          strokeColor="#FF6600"
          onError={(e) => Bugsnag.notify(e)}
        />

        {location && (
          <Marker.Animated
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Origin"
            identifier="origin"
            description=""
          >
            <View className="h-24 w-24 bg-[#FF6600]/20 rounded-full flex items-center justify-center">
              <View className="h-10 w-10 bg-[#2FA94E] rounded-full flex items-center justify-center">
                <Image
                  source={shape}
                  className="h-3 w-3"
                  style={{
                    transform: [
                      {
                        rotate:
                          location.heading === undefined
                            ? '0deg'
                            : `${location.heading}deg`,
                      },
                    ],
                  }}
                />
              </View>
            </View>
          </Marker.Animated>
        )}
        {destination && (
          <Marker.Animated
            coordinate={destination}
            title="Destination"
            identifier="destination"
            description=""
          >
            {/* <Image source={marker} /> */}

            <View className="h-8 w-8 bg-[#FF6600]/20 rounded-full flex items-center justify-center">
              <View className="h-4 w-4 bg-[#FF6600] rounded-full"></View>
            </View>
          </Marker.Animated>
        )}
      </MapView.Animated>
      {children}
      {/* <SafeAreaView className="flex-1 w-full rounded-t-[20px] bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <View className="mt-8 h-full">
            <GooglePlacesAutocomplete
              placeholder="Search"
              fetchDetails
              onPress={(data, details) => {
                console.log(data, details);
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
                components: 'country:ng',
              }}
              minLength={2}
              nearbyPlacesAPI="GooglePlacesSearch"
              enablePoweredByContainer={false}
              debounce={400}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView> */}
    </View>
  );
};
