import React, { ReactNode } from "react";
import { Modal } from "antd";
import "./style.scss";

interface ModalProps {
  closable?: boolean;
  visible: boolean;
  close: () => void;
  children: ReactNode;
  addOns?: string;
}

export const MainModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal
      closable={props.closable ? false : true}
      keyboard={props.closable ? false : true}
      cancelButtonProps={{ style: { display: "none" } }}
      open={props.visible}
      onCancel={props.close}
      destroyOnClose
      footer={null}
      className={`new-modal ${props.addOns}`}
      centered={true}
      okButtonProps={{ style: { display: "none" } }}
      mask={true} 
      maskClosable={false} 
    >
      {props.children}
    </Modal>
  );
};
