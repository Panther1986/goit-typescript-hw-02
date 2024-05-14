import { FC } from "react";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
