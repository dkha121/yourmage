import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const LINK_API = `${import.meta.env.VITE_API_URL}`;

//xử lý ở local
const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

const saveOtpUserToLocalStorage = (otpInfo) => {
  localStorage.setItem("otpInfo", JSON.stringify(otpInfo));
};

export const removeOtpUserToLocalStorage = () => {
  localStorage.removeItem("otpInfo");
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  return user;
};

//save token ở local
const saveTokenToLocalStorage = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

const getTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};

//đang bị gặp bug khi nhập sai mật khẩu (do api trả status sai)
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/auth/signin`,
      userCredentials
    );
    const token = response.data.accessToken;
    const user = jwt_decode(token);
    saveTokenToLocalStorage(token);
    saveUserToLocalStorage(user);
    return user;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/auth/signup`,
      userCredentials
    );
    return response;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (email) => {
  const axiosInstance = axios.create({
    baseURL: LINK_API,
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    },
  });
  try {
    const response = await axiosInstance.delete(`/users/${email}`);
    return response;
  } catch (error) {
    console.log(error);
  }
});

//email services
export const sendOtpRegister = createAsyncThunk(
  "user/sendOtpRegister",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/email/sendOtpRegister`,
      userCredentials
    );
    return response;
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (userCredentials) => {
    const response = await axios.post(
      `${LINK_API}/email/verifyOtp`,
      userCredentials
    );
    return response;
  }
);

export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  async (accessToken) => {
    const token = { token: accessToken };

    try {
      const response = await axios.post(`${LINK_API}/auth/google/login`, token);

      const tokenFromResponse = response.data.accessToken;
      const user = jwt_decode(tokenFromResponse);
      saveUserToLocalStorage(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

//change profile
export const changeUserName = createAsyncThunk(
  "user/changeUserName",
  async ({ email, username }) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const response = await axiosInstance.patch(
      `/users/${email}/username/${username}`
    );
    return response;
  }
);

export const changeInterests = createAsyncThunk(
  "user/changeInterests",
  async ({ email, newInterests }) => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    const interests = { interests: newInterests };
    const response = await axiosInstance.patch(
      `/users/${email}/interests`,
      interests
    );
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action?.error?.message === "Request failed with status code 401") {
          state.error = "Your password is not correct!";
        } else if (
          action.error?.message === "Request failed with status code 404"
        ) {
          state.error = "Account not found!";
        } else if (
          action.error?.message === "Request failed with status code 400"
        ) {
          state.error = "Password is not correct!";
        } else {
          state.error = action.error?.message;
        }
      })
      //login gg
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action?.error?.message === "Request failed with status code 401") {
          state.error = "Your password is not correct!";
        } else if (
          action.error?.message === "Request failed with status code 404" ||
          "Request failed with status code 400"
        ) {
          state.error = "Account not found!";
        } else {
          state.error = action.error.message;
        }
      })
      //create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.error?.message === "Request failed with status code 400") {
          state.error = "Your email already existed!";
        } else {
          state.error = null;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;

        if (action.error.message === "Request failed with status code 400") {
          state.error = "Your email already existed!";
        } else {
          state.error = action.error.message;
        }
      })
      //delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        removeUserFromLocalStorage();
        removeTokenFromLocalStorage();
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //send otp register
      .addCase(sendOtpRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        saveOtpUserToLocalStorage(state.user);
      })
      .addCase(sendOtpRegister.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      //verify otp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;

        if (action.error.message === "Request failed with status code 400") {
          state.error = "Wrong OTP! Please try again!";
        } else {
          state.error = action.error.message;
        }
      })

      //CHANGE PROFILE
      //change user name
      .addCase(changeUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      })

      //change interests
      .addCase(changeInterests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeInterests.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(changeInterests.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = action.error.message;
      });
  },
  reducers: {
    logoutUser: (state) => {
      removeUserFromLocalStorage();
      removeTokenFromLocalStorage();
      state.loading = false;
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logoutUser, setError } = userSlice.actions;

export default userSlice.reducer;
