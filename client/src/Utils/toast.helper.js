import { parseHtmlError } from './errors.utils';
import { showToast } from './toast.utils';

export const handleApiResponse = (response, successMessage, errorMessage) => {
  const { status, data } = response;

  switch (status) {
    case 200:
    case 201:
      showToast(data.message || successMessage || 'Operation succeeded', 'success');
      break;
    case 400:
    case 401:
    case 404:
    case 422:
      let parsedErrorMessage = data.message || errorMessage || 'An error occurred';

      // Check if the response data is in HTML format
      if (typeof data === 'string' && data.includes('<!DOCTYPE html>')) {
        parsedErrorMessage = parseHtmlError(data);
      }

      showToast(parsedErrorMessage, 'error');
      break;
    default:
      showToast(errorMessage || 'An unexpected error occurred', 'error');
      break;
  }
};
