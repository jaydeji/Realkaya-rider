import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DateInput, Button, Select, CheckBox, Input } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

export const StepTwo = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const [vehicleChecked, setVehicleChecked] = useState(false);

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-alt-4 ">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={height}
      >
        <ScrollView className="flex-1" keyboardShouldPersistTaps="always">
          <View className="flex-1 p-5">
            <Span textClass="text-primary font-Mulish-Bold text-lg mt-12">
              Vehicle Details
            </Span>
            <Span textClass="mb-10">
              Please provide us with your Vehicle details for proper arrangement
            </Span>
            <View className="mb-4">
              <CheckBox
                checked={vehicleChecked}
                onPress={() => setVehicleChecked(!vehicleChecked)}
                text="I have a Vehicle to use for delivery"
              />
            </View>
            {vehicleChecked && (
              <>
                <View className="w-full">
                  <Input
                    label="Vehicle manufacturer"
                    placeholder="e,g, Yamaha 314"
                    // value={state.email}
                    // onChange={(text) => handleChangeText(text, 'email')}
                  />
                </View>
                <View className="w-full mt-4">
                  <Select
                    value={value}
                    items={items}
                    setItems={setItems}
                    label="Vehicle Type"
                    // onChange={(text) => handleChangeText(text, 'email')}
                  />
                </View>
                <View className="w-full mt-4">
                  <Input
                    label="License Plate"
                    placeholder="e.g, BG 336 CB"
                    // value={state.email}
                    // onChange={(text) => handleChangeText(text, 'email')}
                  />
                </View>
                <View className="w-full mt-4">
                  <Input
                    value={value}
                    label="Address"
                    multiline
                    textClass="h-[90px]"
                    // onChange={(text) => handleChangeText(text, 'email')}
                  />
                </View>
              </>
            )}
            <View className="mt-[72px]">
              <Button onPress={() => navigation.navigate('StepThree')}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
