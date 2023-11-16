import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllAccount } from "../../datasource/Account";

const HomePage = () => {
  const handleTestAPI = async () => {
    try {
      const rs = await getAllAccount();
      console.log("🚀 - handleTestAPI - rs: ", rs);
    } catch (error) {
      console.log("🚀 - handleTestAPI - error: ", error);
    }
  };

  useEffect(() => {
    handleTestAPI();
  }, []);

  return (
    <div>
      HomePage
      <Link to="/login">Login</Link>
    </div>
  );
};

export default HomePage;
