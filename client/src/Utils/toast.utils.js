import toast from 'react-hot-toast';

export const showToast = (message, type = 'success', options = {}) => {
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast(message, options);
      break;
    case 'loading':
      toast.loading(message, options);
      break;
    default:
      toast(message, options);
      break;
  }
};
