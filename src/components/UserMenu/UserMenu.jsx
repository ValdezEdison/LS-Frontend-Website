import React from "react";
import UserMenuItem from "./UserMenuItem";
import styles from "./UserMenu.module.css";

const UserMenu = ({ logout }) => {
  const menuItems = [
    {
      icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07027 7.8931C7.05861 7.8931 7.04111 7.8931 7.02944 7.8931C7.01194 7.8931 6.98861 7.8931 6.97111 7.8931C5.64694 7.85227 4.65527 6.81977 4.65527 5.5481C4.65527 4.2531 5.71111 3.19727 7.00611 3.19727C8.30111 3.19727 9.35694 4.2531 9.35694 5.5481C9.35111 6.8256 8.35361 7.85227 7.08777 7.8931C7.07611 7.8931 7.07611 7.8931 7.07027 7.8931ZM7.00027 4.06643C6.18361 4.06643 5.52444 4.73143 5.52444 5.54227C5.52444 6.34143 6.14861 6.98893 6.94194 7.0181C6.95944 7.01227 7.01777 7.01227 7.07611 7.0181C7.85777 6.97727 8.47027 6.3356 8.47611 5.54227C8.47611 4.73143 7.81694 4.06643 7.00027 4.06643Z" fill="#292D32"></path><path d="M6.99982 13.271C5.43066 13.271 3.93149 12.6877 2.77066 11.626C2.66566 11.5327 2.61899 11.3927 2.63066 11.2585C2.70649 10.5643 3.13816 9.91685 3.85566 9.43852C5.59399 8.28352 8.41149 8.28352 10.144 9.43852C10.8615 9.92268 11.2932 10.5643 11.369 11.2585C11.3865 11.3985 11.334 11.5327 11.229 11.626C10.0682 12.6877 8.56899 13.271 6.99982 13.271ZM3.54649 11.1418C4.51482 11.9527 5.73399 12.396 6.99982 12.396C8.26566 12.396 9.48482 11.9527 10.4532 11.1418C10.3482 10.786 10.0682 10.4418 9.65399 10.1618C8.21899 9.20518 5.78649 9.20518 4.33982 10.1618C3.92566 10.4418 3.65149 10.786 3.54649 11.1418Z" fill="#292D32"></path><path d="M7.00033 13.2702C3.54116 13.2702 0.729492 10.4585 0.729492 6.99935C0.729492 3.54018 3.54116 0.728516 7.00033 0.728516C10.4595 0.728516 13.2712 3.54018 13.2712 6.99935C13.2712 10.4585 10.4595 13.2702 7.00033 13.2702ZM7.00033 1.60352C4.02533 1.60352 1.60449 4.02435 1.60449 6.99935C1.60449 9.97435 4.02533 12.3952 7.00033 12.3952C9.97533 12.3952 12.3962 9.97435 12.3962 6.99935C12.3962 4.02435 9.97533 1.60352 7.00033 1.60352Z" fill="#292D32"></path></svg>',
      label: "Gestionar cuenta",
      action: () => console.log("Navigate to account management"),
    },
    {
      icon: '<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 12.4444C6.79814 12.4444 6.60279 12.4187 6.44 12.3606C3.95256 11.5159 0 8.51767 0 4.08797C0 1.8312 1.84279 0 4.10884 0C5.2093 0 6.23814 0.425561 7 1.18641C7.76186 0.425561 8.7907 0 9.89116 0C12.1572 0 14 1.83765 14 4.08797C14 8.52412 10.0474 11.5159 7.56 12.3606C7.39721 12.4187 7.20186 12.4444 7 12.4444ZM4.10884 0.967185C2.38326 0.967185 0.976744 2.36638 0.976744 4.08797C0.976744 8.49188 5.25488 10.9421 6.75907 11.4515C6.87628 11.4902 7.13023 11.4902 7.24744 11.4515C8.74512 10.9421 13.0298 8.49833 13.0298 4.08797C13.0298 2.36638 11.6233 0.967185 9.89768 0.967185C8.90791 0.967185 7.98977 1.42499 7.39721 2.21808C7.21488 2.4631 6.79814 2.4631 6.61581 2.21808C6.01023 1.41854 5.0986 0.967185 4.10884 0.967185Z" fill="#151820"></path></svg>',
      label: "Favoritos",
      action: () => console.log("Navigate to favorites"),
    },
    {
      icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.88997 1.00857H8.81413C6.22413 1.00857 4.9758 2.0294 4.75997 4.31607C4.73663 4.55523 4.91163 4.77107 5.15663 4.7944C5.38997 4.81773 5.61163 4.6369 5.63497 4.39773C5.80413 2.56607 6.66747 1.88357 8.81997 1.88357H8.8958C11.27 1.88357 12.11 2.72357 12.11 5.09773V8.90107C12.11 11.2752 11.27 12.1152 8.8958 12.1152H8.81997C6.6558 12.1152 5.79247 11.4211 5.63497 9.5544C5.6058 9.31523 5.40163 9.1344 5.15663 9.15773C4.91163 9.17523 4.73663 9.39107 4.75413 9.63023C4.95247 11.9519 6.20663 12.9902 8.81413 12.9902H8.88997C11.7541 12.9902 12.9791 11.7652 12.9791 8.90107V5.09773C12.9791 2.23357 11.7541 1.00857 8.88997 1.00857Z" fill="#292D32"></path><path d="M8.74966 6.5625H2.11133C1.87216 6.5625 1.67383 6.76083 1.67383 7C1.67383 7.23917 1.87216 7.4375 2.11133 7.4375H8.74966C8.98883 7.4375 9.18716 7.23917 9.18716 7C9.18716 6.76083 8.98883 6.5625 8.74966 6.5625Z" fill="#292D32"></path><path d="M3.41267 4.60875C3.30184 4.60875 3.191 4.64958 3.1035 4.73708L1.14934 6.69125C0.980169 6.86042 0.980169 7.14042 1.14934 7.30958L3.1035 9.26375C3.27267 9.43292 3.55267 9.43292 3.72184 9.26375C3.891 9.09458 3.891 8.81458 3.72184 8.64542L2.07684 7.00042L3.72184 5.35542C3.891 5.18625 3.891 4.90625 3.72184 4.73708C3.64017 4.64958 3.5235 4.60875 3.41267 4.60875Z" fill="#292D32"></path></svg>',
      label: "Cerrar sesión",
      action: logout,
    },
  ];

  return (
    <nav className={styles.userMenu} aria-label="User menu">
      {menuItems.map((item, index) => (
        <UserMenuItem 
          key={index} 
          icon={item.icon} 
          label={item.label}
          onClick={item.action}
        />
      ))}
    </nav>
  );
};

export default UserMenu;