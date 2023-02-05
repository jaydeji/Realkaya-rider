import { AxiosError } from 'axios';
import { useAppStore } from '../store';
import { snack } from './snack';

export const handleError = (error: AxiosError) => {
  const responseData = error.response?.data as any;

  if (error.response?.status === 400 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.response?.status === 403 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.response?.status === 401) {
    useAppStore.getState().logout();
  }

  if (error.response?.status === 500) {
    snack('Server error');
  }
};
