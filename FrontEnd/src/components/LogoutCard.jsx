import { useContext } from "react";
import { Login as AuthContext } from "../context/authContext";

const LogoutForm = ({ onClose }) => {
  const { logout } = useContext(AuthContext);

  const closeCard = () => {};
  return (
    <>
      <div>
        <p>Estas seguro?</p>
        <button onClick={logout}>Si</button>
        <button onClick={onClose}>No</button>
      </div>
    </>
  );
};

export default LogoutForm;
