import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  SafeAreaView,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import marker from '../assets/images/marker.png';
import shape from '../assets/images/Shape.png';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet from '@gorhom/bottom-sheet';
import { TouchableHighlight } from 'react-native-gesture-handler';

type Props = {};

export const Map = (props: Props) => {
  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // console.log(location);

  useEffect(() => {
    if (mapRef.current === null) return;
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: { top: 50, bottom: 50, left: 50, right: 50 },
    });
  }, []);

  // const snapPoints = useMemo(() => ['25%', '50%'], []);
  const snapPoints = useMemo(() => ['40%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View className="flex-1 items-center">
      <MapView.Animated
        ref={mapRef}
        // style={styles.map}
        className="w-full h-2/3"
        // className="w-full h-2/3 -mb-5"
        // className="w-full h-full"
        mapType={MAP_TYPES.MUTEDSTANDARD}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.514577,
          longitude: 3.391881,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
          // longitude: -122.4324,
          // latitudeDelta: 0.0922,
          // longitudeDelta: 0.0421,
        }}
      >
        <MapViewDirections
          origin={{ latitude: 6.514577, longitude: 3.391881 }}
          destination={{
            latitude: 6.518572387441918,
            longitude: 3.372669140201567,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#FF6600"
        />
        <Marker.Animated
          coordinate={{ latitude: 6.514577, longitude: 3.391881 }}
          title="Origin"
          identifier="origin"
          description="The uk"
        >
          {/* <Image source={marker} /> */}

          <View className="h-8 w-8 bg-[#FF6600]/20 rounded-full flex items-center justify-center">
            <View className="h-4 w-4 bg-[#FF6600] rounded-full"></View>
          </View>
        </Marker.Animated>
        <Marker
          coordinate={{
            latitude: 6.518572387441918,
            longitude: 3.372669140201567,
          }}
          title="Origin"
          identifier="destination"
          description="Yabatech"
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
                        location?.coords.heading === undefined
                          ? '0deg'
                          : `${location.coords.heading}deg`,
                    },
                  ],
                }}
              />
            </View>
          </View>
        </Marker>
      </MapView.Animated>
      <BottomSheet
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View className="p-5 flex-1 items-center justify-center">
          <Text className="text-base font-bold">Where are you?</Text>
          <Text className="text-xs mt-[7px] text-center px-5">
            Set your location so we can pickup your product at the right spot
            and find dispatch riders available around you
          </Text>
          <View className="w-full mt-10">
            <TouchableHighlight className="bg-primary h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
              <Text className="text-white font-bold">Set automatically</Text>
            </TouchableHighlight>
          </View>
          <View className="w-full mt-5">
            <TouchableHighlight className="bg-alt-1 h-[50px] items-center justify-center rounded-[5px] overflow-hidden">
              <Text className="font-bold">Set later</Text>
            </TouchableHighlight>
          </View>
        </View>
      </BottomSheet>
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
