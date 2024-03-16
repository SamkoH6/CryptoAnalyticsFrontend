import React from "react";
import Box from "@mui/material/Box";
import { Container, alpha } from "@mui/system";
import { Typography } from "@mui/material";

const ChartBox = ({ children, tag }) => {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      })}
      id={tag}
    >
      <Container
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 4 },
        }}
      >
        <Box
          id="chart"
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: "center",
            height: "50%", // Adjust the percentage as needed
            width: "80%", // Adjust the percentage as needed
            backgroundColor: "transparent", // Set background color to transparent
            borderRadius: "10px",
            outline: "1px solid",
            outlineColor:
              theme.palette.mode === "light"
                ? alpha("#BFCCD9", 0.5)
                : alpha("#9CCCFC", 0.1),
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
          })}
        >
          {children}
        </Box>
        <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
          If the colors are not visible, try refreshing the page.
        </Typography>
      </Container>
    </Box>
  );
};

export default ChartBox;
