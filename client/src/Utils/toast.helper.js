import { showToast } from './toast.utils';

export const handleApiResponse = (response, successMessage, errorMessage) => {
  const { status, data } = response;

  switch (status) {
    case 200:
    case 201:
      showToast(data.message || successMessage || 'Operation succeeded', 'success');
      break;
    case 400:
    case 404:
    case 422:
      showToast(data.message || errorMessage || 'An error occurred', 'error');
      break;
    default:
      showToast(errorMessage || 'An unexpected error occurred', 'error');
      break;
  }
};
