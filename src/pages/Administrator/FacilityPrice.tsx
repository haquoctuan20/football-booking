import { useParams } from "react-router-dom";
import { FacilityService } from "../../datasource/Factility";
import { useEffect, useState } from "react";
import { IFacility } from "../../constants/facility";
import { Container } from "react-bootstrap";

const FacilityPrice = () => {
  const { id } = useParams();

  const [facility, setFacility] = useState<IFacility>();

  const handleGetFacilityById = async (id: string) => {
    try {
      const { data } = await FacilityService.getFacilityById(id);
      setFacility(data);
    } catch (error) {
      console.log("🚀 - handleGetFacilityById - error: ", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    handleGetFacilityById(id);
  }, [id]);

  return (
    <div>
      <Container>
        {/* info */}
        <div>
          <div>Tên cơ sở: {facility?.name}</div>
        </div>
      </Container>
    </div>
  );
};

export default FacilityPrice;
