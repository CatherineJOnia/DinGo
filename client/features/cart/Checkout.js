import React, { useEffect } from "react";
import { checkoutCart } from "./cartSlice";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import GuestCart from "./GuestCart";
import Review from "./Review";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { connect } from "react-redux";

const steps = ["Review your order", "Shipping address", "Payment details"];

const theme = createTheme({
  typography: {
    fontFamily: ["Work Sans"].join(","),
  },
  palette: {
    primary: {
      main: "#ceb5a7",
    },
    secondary: {
      main: "#5b7b7a",
    },
  },
});

function Checkout(props) {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return props.user.id ? <Review /> : <GuestCart />;
      case 1:
        return <AddressForm />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (props.user.id) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Please sign in to Checkout!");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (id) => {
    props.checkoutCart(props.user.id);
    setActiveStep(activeStep + 1);
  };

  const userId = props.user.id;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button
                      onClick={handleBack}
                      sx={{ mt: 3, ml: 1 }}
                      color="secondary"
                    >
                      Back
                    </Button>
                  )}

                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                      color="secondary"
                    >
                      Complete Order
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                      color="secondary"
                    >
                      {userId ? "Next" : "Sign in to Checkout"}
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

const mapState = (state) => ({
  user: state.auth,
});

const mapDispatch = (dispatch) => ({
  checkoutCart: (userId) => dispatch(checkoutCart(userId)),
});

export default connect(mapState, mapDispatch)(Checkout);
