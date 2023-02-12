import { ImageInfo } from 'expo-image-picker';
import create from 'zustand';

type FormStoreState = {
  registerForm: Record<string, any>;
  images: Record<string, ImageInfo>;
  setRegisterForm: (key: string, value: any) => void;
  setImage: (key: string, value: ImageInfo) => void;
};

export const useFormStore = create<FormStoreState>((set) => ({
  registerForm: {
    dateOfBirth: new Date(),
    identification: {
      dateIssued: new Date(),
    },
    account: {},
    role: 'RIDER',
  },
  setRegisterForm: (key, value) => {
    set((store) => ({ registerForm: { ...store.registerForm, [key]: value } }));
  },
  images: {},
  setImage: (key, value) => {
    set((store) => ({ images: { ...store.images, [key]: value } }));
  },
}));
