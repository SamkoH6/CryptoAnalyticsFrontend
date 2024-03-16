import * as React from "react";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Hero({ mainData, setMainData }) {
  const [cryptoSymbol, setCryptoSymbol] = React.useState("");
  const [cryptoDays, setCryptoDays] = React.useState("");

  const handleGenerateClick = () => {
    const dataToSend = {
      cryptoSymbol: cryptoSymbol,
      cryptoDays: cryptoDays,
    };

    // URL of the Flask endpoint
    const url = "https://cryptoanalyticsbackend.onrender.com/";

    // Send POST request using Axios
    axios
      .post(url, dataToSend)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        setMainData(response.data);
        window.location.reload();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  };

  return (
    <Box
      id="inputs"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {mainData.current_coin
              ? mainData.current_coin.charAt(0).toUpperCase() +
                mainData.current_coin.slice(1)
              : ""}
            &nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Analytics
            </Typography>
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            The data is saved, last generated data is being shown <br />
            To regenerate new data click fill out the form <br />
            After clicking on Generate, you have to wait a few second for the
            data to update <br />
            If nothing changed, your input was invalid
          </Typography>
          <Stack
            direction={{ xs: "column" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="crypto_symbol"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter the crypto symbol"
              placeholder="Enter the crypto symbol"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter the crypto symbol",
              }}
              value={cryptoSymbol}
              onChange={(e) => setCryptoSymbol(e.target.value)}
            />
            <TextField
              id="crypto_days"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter the amount of days to cover"
              placeholder="Enter the amount of days to cover, >30"
              inputProps={{
                autoComplete: "off",
                "aria-label": "Enter the amount of days to cover",
              }}
              value={cryptoDays}
              onChange={(e) => setCryptoDays(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateClick}
            >
              Generate
            </Button>
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            Crypto data from &nbsp;
            <Link href="https://www.coingecko.com/en/api" color="primary">
              Coingecko API
            </Link>
            .
            <br />
            Last updated {mainData.last_updated}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
