// menu.js
export const getUserMenu = (userId) => [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Appointments",
    icon: "fa-solid fa-list-check",
    slug: "/user/appointments",
  },
  {
    name: "Apply Doctor",
    icon: "fa-solid fa-user-doctor",
    slug: "/apply-doctor",
  },
  {
    name: "Update Profile",
    icon: "fa-solid fa-user-tie",
    slug: `/user/update-profile/${userId}`,
  },
  {
    name: "Change password",
    icon: "fa-solid fa-lock",
    slug: `/user/change-password`,
  },
];

export const getAdminMenu = (userId) => [
  {
    name: "Home",
    icon: "fa-solid fa-house",
    slug: "/dashboard",
  },
  {
    name: "Doctors",
    icon: "fa-solid fa-user-doctor",
    slug: "/admin/doctors",
  },
  {
    name: "Users",
    icon: "fa-solid fa-users ",
    slug: "/admin/users",
  },
  {
    name: "Update Profile",
    icon: "fa-solid fa-user-tie",
    slug: `/user/update-profile/${userId}`,
  },
  {
    name: "Change password",
    icon: "fa-solid fa-lock",
    slug: `/user/change-password`,
  },
];
