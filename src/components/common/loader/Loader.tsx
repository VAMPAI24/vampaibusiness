import React from "react";
import "./Loader.css";

interface LoaderProps {
  spinner?: boolean;
}

const Loader = ({ spinner }: LoaderProps) => {
  return (
    <div>
      {spinner ? (
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="spinnercont">
          <div className="spinner">
            <div className="bounce1" />
            <div className="bounce2" />
            <div className="bounce3" />
          </div>
          <p>Loading, please wait.</p>
        </div>
      )}
    </div>
  );
};

export default Loader;
