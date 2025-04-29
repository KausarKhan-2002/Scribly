// Error handling function
exports.catchError = (err, res, customMessage = null) => {
  console.error(err); // Log the error to the console (for debugging)

  // If customMessage is provided, use it, otherwise, use the error's message
  const message =
    customMessage ||
    err.message ||
    "An error occurred while processing your request. Please try again later.";

  // Send a response with the message
  res.status(500).json({
    success: false,
    message: message, // Send the custom or error message
  });
};
