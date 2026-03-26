// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// window.Echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_APP_KEY,
//   cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,

//   wsHost: import.meta.env.VITE_PUSHER_HOST,
//   wsPort: import.meta.env.VITE_PUSHER_PORT || 6001,
//   wssPort: import.meta.env.VITE_PUSHER_PORT || 6001,

//   forceTLS: import.meta.env.VITE_PUSHER_SCHEME === "https",
//   disableStats: true,
//   enabledTransports: ["ws", "wss"],

//   authEndpoint: "/admin/broadcasting/auth",
//   auth: {
//     headers: {
//       "X-CSRF-TOKEN": document
//         .querySelector('meta[name="csrf-token"]')
//         ?.getAttribute("content"),
//     },
//     withCredentials: true,
//   },
// });

import Echo from "laravel-echo";
import Pusher from "pusher-js";
// get host_type from localStorage
const hostType = localStorage.getItem("host_type") || "admin";

const userData = JSON.parse(localStorage.getItem("userData"));
console.log(userData, "agvsdca");
// Choose endpoint based on type
let authEndpoint =
  "https://admin-unlock-vault.developer-ourbase-camp.com/broadcasting/auth";

if (hostType === "vendor") {
  authEndpoint =
    "https://admin-unlock-vault.developer-ourbase-camp.com/broadcasting/auth";
}

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  authEndpoint:
    "https://admin-unlock-vault.developer-ourbase-camp.com/broadcasting/auth",

  auth: {
    headers: {
      Authorization: `Bearer ${userData?.token}`,
    },
    withCredentials: true,
  },
});
