//admin menu
export const adminMenu = [
  {
    //hệ thống
    name: "Quản lý hệ thống",
    menus: [
      {
        name: "Quản lý người dùng",
        link: "/system/user-manage",
      },
      {
        name: "Quản lý bác sĩ",
        link: "/doctor/manage-doctor",
      },
      // {
      //   name: "Quản lý lịch khám bệnh",
      //   link: "/doctor/manage-schedule",
      // },
    ],
  },
  {
    //Phòng khám
    name: "Phòng khám",
    menus: [
      {
        name: "Quản lý phòng khám",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //Chuyên khoa
    name: "Chuyên khoa",
    menus: [
      {
        name: "Quản lý chuyên khoa",
        link: "/system/manage-specialty",
      },
    ],
  },
];

//doctor menu
export const doctorMenu = [
  {
    //hệ thống
    name: "Quản lý hệ thống",
    menus: [
      // {
      //   name: "Quản lý thông tin",
      //   link: "/doctor/manage-doctor",
      // },
      {
        name: "Quản lý lịch khám bệnh",
        link: "/doctor/manage-schedule",
      },
      {
        name: "Quản lý bệnh nhân",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
