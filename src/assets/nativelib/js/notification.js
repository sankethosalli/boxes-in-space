import { store } from "react-notifications-component";

const createNotification = (params) => {
  store.addNotification({
    title: params.title,
    message: params.message,
    type: params.type,
    //   type: "info",
    //   type: "success",
    //   type: "warning",
    //   type: "danger",
    insert: "top",
    //   container: "top-right",
    //   container: "bottom-left",
    //   container: "center",
    container: params.container ? params.container : "top-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};
export default createNotification;
