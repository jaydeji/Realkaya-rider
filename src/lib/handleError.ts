import { AxiosError } from 'axios';
import { useAppStore } from '../store';
import { snack } from './snack';

export const handleError = (error: AxiosError<{ message?: string }>) => {
  const responseData = error.response?.data;

  if (error.response?.status === 400 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.response?.status === 403 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.response?.status === 401) {
    useAppStore.getState().logout();
    return;
  }

  if (error.response?.status === 500) {
    return snack('Server error');
  }

  snack('error getting response');
};
