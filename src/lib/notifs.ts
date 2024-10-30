import { notification } from "antd";

// notifications
interface NotificationProps {
  message: string;
  title?: string | null;
  type?: "success" | "error";
}

export const openNotificationWithIcon = ({ message, title = null,type = "success",}: NotificationProps) => {
  notification[type](
    {message: title,
    description: message,
    duration: 5,
    className: "text-white",
    style: {
      width: 450,
      borderRadius: 10,
      color: "red",
      backgroundColor: "#057A55",

      zIndex: 9999999,
    },
  });
};

export const openNotificationWithIconErr = ({
  message,
  title = null,
  type = "error",
}: NotificationProps) => {
  notification[type]({
    message: title,
    description: message,
    duration: 5,
    style: {
      width: 450,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#DD2323",
      borderRadius: 10,
      // backgroundColor: "#FFF0F0",
      // color: "#BB1414",
      backgroundColor: "#E02424",
      color: "#FFFFFF",
      zIndex: 9999999,
    },
  });
};
