import React from "react";
import style from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <p className={style.errorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
