import Toast, { ToastOptions } from 'react-native-root-toast';

export const snack = (text: string, options?: ToastOptions) => {
  Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    ...options,
  });
};
