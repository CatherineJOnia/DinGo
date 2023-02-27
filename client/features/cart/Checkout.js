import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { checkoutCartAsync, selectCart } from "./cartSlice";
import { selectSingleProduct } from "../products/singleProductSlice";

import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import GuestCart from "./GuestCart";
import Review from "./Review";

import {
  CssBaseline,
  Box,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const steps = ["Review Your Order", "Shipping Address", "Payment Details"];

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

const Checkout = () => {
  function getStepContent(step) {
    switch (step) {
      case 0:
        return userId ? <Review /> : <GuestCart />;
      case 1:
        return <AddressForm />;
      case 2:
        return <PaymentForm />;
      default:
        throw new Error("Unknown step");
    }
  }

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.me.id);
  const isLoggedIn = useSelector((state) => state.auth.me.id);
  const product = useSelector(selectSingleProduct);
  const cart = useSelector(selectCart);
  const { productId } = useParams();

  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = async (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      setActiveStep(activeStep + 1);
    } else {
      alert("Please sign in to Checkout!");
    }
  };

  const handleBack = async (event) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(checkoutCartAsync(userId));
    setActiveStep(activeStep + 1);
  };

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
                      {isLoggedIn ? "Next" : "Sign in to Checkout"}
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
};

export default Checkout;
