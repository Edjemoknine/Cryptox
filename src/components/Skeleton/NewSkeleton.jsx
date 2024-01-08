import Skeleton from "react-loading-skeleton";
const NewSkeleton = () => {
  return (
    <Box>
      <div className="flex items-center gap-6">
        <Skeleton height={20} width={150} />
        <Skeleton height={50} width={50} circle />
      </div>
      <div>
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
      </div>
    </Box>
  );
};

export default NewSkeleton;

function Box({ children }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        display: "block",
        lineHeight: 2,
        borderRadius: "10px",
        background: "#ddd",
        height: "250px",
        padding: "10px",
        width: "270px",
        margin: "1rem",
      }}
    >
      {children}
    </div>
  );
}
