import { toast } from 'react-hot-toast';

// لإظهار إشعار في أي مكون
const notify = (msg, type) => {
  if (type === 'warning') {
    toast(msg, { icon: '⚠️' });
  } else if (type === 'success') {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
};

export default notify;
