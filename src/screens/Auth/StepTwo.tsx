import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Select, CheckBox, Input } from 'components';
import { Span } from 'components/Span';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import { useFormStore } from 'store/formStore';
import { snack } from 'lib/snack';

export const StepTwo = () => {
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const registerForm = useFormStore((store) => store.registerForm);
  const setRegisterForm = useFormStore((store) => store.setRegisterForm);

  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' },
  // ]);

  const disabled = !registerForm.vehicle
    ? false
    : !registerForm.vehicle.manufacturer ||
      !registerForm.vehicle.licensePlate ||
      !registerForm.vehicle.address;

  const handleNext = () => {
    if (disabled) return snack('Please fill all required fields');
    navigation.navigate('StepThree');
  };

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
                checked={!!registerForm.vehicle}
                onPress={() => {
                  if (!registerForm.vehicle) setRegisterForm('vehicle', {});
                  else setRegisterForm('vehicle', undefined);
                }}
                text="I have a Vehicle to use for delivery"
              />
            </View>
            {!!registerForm.vehicle && (
              <>
                <View className="w-full">
                  <Input
                    label="Vehicle manufacturer"
                    placeholder="e,g, Yamaha 314"
                    value={registerForm.vehicle.manufacturer}
                    onChange={(text) =>
                      setRegisterForm('vehicle', {
                        ...registerForm.vehicle,
                        manufacturer: text,
                      })
                    }
                  />
                </View>
                <View className="w-full mt-4">
                  {/* <Select
                    items={items}
                    setItems={setItems}
                    label="Vehicle Type"
                    // value={registerForm.vehicleType}
                    // setValue={(value) => {
                    //   console.log(value);
                    //   setRegisterForm('vehicleType', value);
                    // }}
                    value={value}
                    setValue={setValue}
                  /> */}
                  <Input
                    label="Vehicle Type"
                    placeholder="Vehicle Type"
                    value={registerForm.vehicle.vehicleType}
                    onChange={(text) =>
                      setRegisterForm('vehicle', {
                        ...registerForm.vehicle,
                        vehicleType: text,
                      })
                    }
                  />
                </View>
                <View className="w-full mt-4">
                  <Input
                    label="License Plate"
                    placeholder="e.g, BG 336 CB"
                    value={registerForm.vehicle.licensePlate}
                    onChange={(text) =>
                      setRegisterForm('vehicle', {
                        ...registerForm.vehicle,
                        licensePlate: text,
                      })
                    }
                  />
                </View>
                <View className="w-full mt-4">
                  <Input
                    label="Address"
                    multiline
                    textClass="h-[90px]"
                    value={registerForm.vehicle.address}
                    onChange={(text) =>
                      setRegisterForm('vehicle', {
                        ...registerForm.vehicle,
                        address: text,
                      })
                    }
                  />
                </View>
              </>
            )}
            <View className="mt-[72px]">
              <Button onPress={handleNext} disabled={disabled}>
                Next
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
