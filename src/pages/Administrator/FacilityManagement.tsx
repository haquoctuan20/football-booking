import { Link } from "react-router-dom";

const FacilityManagement = () => {
  return (
    <div>
      <Link to="/administrator/facility/create">Create</Link>
      <br />
      <Link to="/administrator/facility/edit/123123123">Edit</Link>
    </div>
  );
};

export default FacilityManagement;
