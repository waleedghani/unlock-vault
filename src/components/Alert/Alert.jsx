// import Swal from "sweetalert2";

// function Alert({ title, text, iconStyle = "success" }) {
//   return Swal.fire({
//     // icon: iconStyle,
//     // title: title,
//     // text: `${text}!`,
//     // timer: 4500,
//     icon: iconStyle,
//     title: title,
//     text: `${text}!`,
//     timer: 4500,
//     background: "#000", // black background
//     color: "#fff", // white text
//     customClass: {
//       popup: "custom-popup",
//       confirmButton: "custom-button",
//     },
//     buttonsStyling: false, // allow custom button styling
//   });
// }

// export default Alert;
import Swal from "sweetalert2";

function Alert({ title, text, iconStyle = "success" }) {
  return Swal.fire({
    icon: iconStyle,
    title: title,
    text: `${text}!`,
    background: "#000", // black background
    color: "#fff",
    confirmButtonColor: "#6b00ff", // red button
    customClass: {
      popup: "swal2-border-radius", // you can still use built-in classes
    },
  });
}

export default Alert;
