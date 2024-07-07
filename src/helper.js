import Swal from "sweetalert2";

export const displayToast = (type, message) => {
  Swal.fire({
    icon: type,
    title: message,
  });
};
