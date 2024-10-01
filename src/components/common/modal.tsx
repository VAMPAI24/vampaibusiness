import React, { ReactNode } from "react";
import { Modal } from "antd";
import "./style.scss";

interface modalProps {
  closable?: boolean;
  visible: boolean;
  close: () => void;
  children: ReactNode;
  addOns?: string;
}
export const Mainmodal: React.FC<modalProps> = (props) => {
  return (
    <Modal
      closable={props.closable ? false : true}
      keyboard={props.closable ? false : true}
      cancelButtonProps={{ style: { display: "none" } }}
      open={props.visible}
      onCancel={props.close}
      destroyOnClose
      footer=""
      className={`new-modal ${props.addOns} `}
      centered={true}
      okButtonProps={{ style: { display: "none" } }}
      maskStyle={{
        // background: 'rgba(76, 0, 0, 0.3)',
        background: `hsla(225, 40%, 2%, 0.25)`,
        backdropFilter: "blur(5px)",
      }}
    >
      {props.children}
    </Modal>
  );
};
