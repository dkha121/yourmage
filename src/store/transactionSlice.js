import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LINK_API = `${import.meta.env.VITE_API_URL}`;

const getTokenFromLocalStorage = () => {
  const token = JSON.parse(localStorage.getItem("token")) || null;
  return token;
};

export const getAllTransaction = createAsyncThunk(
  "user/getAllTransaction",
  async () => {
    const axiosInstance = axios.create({
      baseURL: LINK_API,
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    });

    try {
        const response = await axiosInstance.get(`${LINK_API}/transactions`);
        return response;
    }catch (error){
        console.log(error)
    }

    
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    loading: false,
    transaction: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
    //get all
    .addCase(getAllTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
      })
      .addCase(getAllTransaction.rejected, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.error = action.error.message;
      })
  },
  reducers: {},
});

export default transactionSlice.reducer;
