import Swal from "sweetalert2";

export const showSuccess = (title) => {
  Swal.fire({
    icon: "success",
    title,
    timer: 1600,
    showConfirmButton: false,
    background: "#020617",
    color: "#fff",
    iconColor: "#22c55e",
  });
};

export const showError = (title) => {
  Swal.fire({
    icon: "error",
    title,
    timer: 1800,
    showConfirmButton: false,
    background: "#020617",
    color: "#fff",
    iconColor: "#ef4444",
  });
};

export const showConfirm = async (title) => {
  const result = await Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#22c55e",
    cancelButtonColor: "#ef4444",
    background: "#020617",
    color: "#fff",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
};
