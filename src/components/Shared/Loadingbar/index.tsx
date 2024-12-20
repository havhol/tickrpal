import { Box } from "@radix-ui/themes";

const LoadingBar = ({ loading }: { loading: boolean }) => {
  return (
    loading && (
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background:
            "linear-gradient(90deg, #2962ff 0%, #00bce6 50%, #d500f9 100%)",
          animation: "progressAnimation 2s infinite linear",
        }}
      >
        <style>{`
          @keyframes progressAnimation {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </Box>
    )
  );
};

export default LoadingBar;
