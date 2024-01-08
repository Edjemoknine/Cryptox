import Skeleton from "react-loading-skeleton";

const CoinSkeleton = () => {
  return (
    <Box>
      <div className="flex gap-6 border-b pb-3 border-gray-400">
        <Skeleton height={10} />
        <Skeleton height={50} width={50} circle />
      </div>
      <div className="h-full mt-3 flex-col flex items-center gap-3">
        <Skeleton width={130} height={15} />
        <Skeleton width={130} height={15} />
        <Skeleton width={130} height={15} />
      </div>
    </Box>
  );
};

export default CoinSkeleton;

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
        padding: "1rem",
        marginBottom: "0.5rem",
        width: "200px",
        margin: "1rem",
      }}
    >
      {children}
    </div>
  );
}
