import { useAuth } from "components/AuthProvider/hooks";
import { useNavigate } from "react-router-dom";

interface Props {}

const Wallet: React.FC<Props> = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <>
      Wallet{" "}
      <button
        onClick={() =>
          auth.signout(() => navigate("/login", { replace: true }))
        }
      >
        Logout
      </button>
    </>
  );
};

export default Wallet;
