import styled from "styled-components";

const SkeletonRow = () => {
  return (
    <WrapperSkeletonRow>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
      <div className="skeleton-row"></div>
    </WrapperSkeletonRow>
  );
};

export default SkeletonRow;

const WrapperSkeletonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the gap between skeleton rows */

  .skeleton-row {
    height: 28px; /* Adjust the height of each skeleton row */
    background-color: #f0f0f0; /* Adjust the background color */
    border-radius: 4px;
    animation: loading 0.5s infinite alternate;
  }

  @keyframes loading {
    from {
      background-color: #f0f0f0;
    }
    to {
      background-color: #e0e0e0;
    }
  }
`;
