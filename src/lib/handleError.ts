import { useAppStore } from '../store';
import { snack } from './snack';

type _Error = {
  status?: number;
  body?: { message?: string };
};

export const handleError = (error: _Error) => {
  const responseData = error.body;

  if (error.status === 400 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.status === 403 && responseData?.message) {
    return snack(responseData.message);
  }

  if (error.status === 401) {
    useAppStore.getState().logout();
    return;
  }

  if (error.status === 500) {
    return snack('Server error');
  }
  snack('error getting response');
};
