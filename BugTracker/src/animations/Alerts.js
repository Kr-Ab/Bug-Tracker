import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export const LoginAlertError = Swal.mixin({
  position: "center",
  icon: "error",
  title: "Sorry, invalid user",
  showConfirmButton: false,
  timer: 1500
});

export const SuccesCenterTimer = Swal.mixin({
  position: "center",
  icon: "success",
  title: "Successful process executed",
  showConfirmButton: false,
  timer: 1000
});

export const ErrorCenterTimer = Swal.mixin({
  position: "center",
  icon: "error",
  title: "Error!, try again",
  showConfirmButton: false,
  timer: 1500
});

export const EmailExistAlert = Swal.mixin({
  position: "center",
  icon: "error",
  title: "Sorry, try another email",
  showConfirmButton: false,
  timer: 1000
});
