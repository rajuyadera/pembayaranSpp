import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginAdmin = createAsyncThunk(
  "admin/LoginAdmin",
  async (admin, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/loginadmin", {
        email: admin.email,
        password: admin.password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const AuthSiswa = createAsyncThunk(
  "siswa/AuthSiswa",
  async (siswa, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/loginsiswa", {
        nisn: siswa.nisn,
        nis: siswa.nis,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.msg;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMe = createAsyncThunk("admin/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/meadmin"); 
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const getMeSiswa = createAsyncThunk("siswa/getMeSiswa", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/mesiswa"); 
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const Logout = createAsyncThunk("admin/Logout", async () => {
  await axios.delete("http://localhost:5000/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAdmin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginAdmin.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Login Siswa
    builder.addCase(AuthSiswa.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AuthSiswa.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(AuthSiswa.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get Admin Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get Siswa Login
    builder.addCase(getMeSiswa.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMeSiswa.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMeSiswa.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
