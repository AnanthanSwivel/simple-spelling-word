import { Store } from "react-notifications-component";

export const apiError = (error:any) => {
    if(error.response.status === 404) {
        Store.addNotification({
            title: "Error!",
            message: "Request not found.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
    }
    if(error.code === "ERR_NETWORK") {
        Store.addNotification({
            title: "Error!",
            message: "Please check your internet connection.",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
    }
   
}