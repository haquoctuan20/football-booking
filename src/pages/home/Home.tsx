import { Link } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponent";

const HomePage = () => {
  return (
    <div>
      HomePage
      <Link to="/login">Login</Link>
      <div>123</div>
      <PaginationComponent
        activePage={1}
        total={123}
        perPage={10}
        onClick={(page: number) => {
          console.log("page: ", page);
        }}
      />
    </div>
  );
};

export default HomePage;
