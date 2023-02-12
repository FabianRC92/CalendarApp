export const initialState = {
  status: "checkin",
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated",
  user: {
    uid: "63e51a3afe920c4f186354dd",
    name: "Fabián",
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};
