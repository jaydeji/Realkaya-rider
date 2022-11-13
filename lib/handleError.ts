import { AxiosError } from 'axios';
import { useStore } from '../store';

export const handleError = (error: AxiosError) => {
  //   const errResponse =
  //     (error && error.response && error.response.data) ||
  //     (error && error.message);
  //   console.log(errResponse);
  if (error.response?.status === 400) {
    if (error.response.data?.validationError) {
      alert(error.response.data?.validationError[0].message);
    }
    return;
  }
  if (error.response?.status === 403) {
    if (error.response.data?.message) {
      alert(error.response.data.message);
    }
    return;
  }
  if (error.response?.status === 401) {
    useStore.getState().logout();
  }
  if (error.response?.status === 500) {
    alert('Server error');
  }
};
