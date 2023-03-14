import { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import shape from 'assets/images/Shape.png';
import MapViewDirections from 'react-native-maps-directions';
import { useLocation } from 'hooks';
import { useOrderStore } from 'store';
import { Order } from 'types/app';
import { GOOGLE_MAPS_APIKEY } from 'lib/env';

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

  const destination = getDestination(currentOrder);

  const { location, fullLocation, getLocation } = useLocation({
    onSuccess: (data) => {
      // mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
      //   edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
      // });
      data && mapRef.current?.fitToCoordinates([data]);
    },
  });

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (!currentOrder) return;
    location &&
      destination &&
      mapRef.current?.fitToCoordinates([location, destination], {
        edgePadding,
        animated: true,
      });
  }, [currentOrder]);

  return (
    <View className="flex-1 items-center">
      <MapView.Animated
        ref={mapRef}
        className="w-full flex-1"
        mapType={MAP_TYPES.MUTEDSTANDARD}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.514577,
          longitude: 3.391881,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onMapReady={() => {
          mapRef.current?.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding,
            animated: true,
          });
        }}
      >
        <MapViewDirections
          origin={location || { latitude: 6.514577, longitude: 3.391881 }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#FF6600"
        />

        {fullLocation && (
          <Marker.Animated
            coordinate={{
              latitude: fullLocation.coords.latitude,
              longitude: fullLocation.coords.longitude,
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
                          fullLocation?.coords.heading === undefined
                            ? '0deg'
                            : `${fullLocation.coords.heading}deg`,
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
