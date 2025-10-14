import { login } from "@react-native-seoul/kakao-login";
import axios from "axios";

const url = process.env.EXPO_PUBLIC_BACKEND_URL;

interface LoginResult {
  success: boolean;
  isNewUser?: boolean;
  error?: string;
  tokens?: { accessToken: string; refreshToken: string };
}

export const kakaoLogin = async (): Promise<LoginResult> => {
  try {
    const token = await login(); // 카카오로부터 accessToken, refreshToken 획득
    console.log("✅ Kakao token received:", token);

    // 백엔드로 전달
    const res = await axios.post(`${url}/api/auth/login`, {
      accessToken: token.accessToken,
    });

    const { accessToken, refreshToken } = await res.data;

    // authStorage 저장

    return {
      success: true,
      isNewUser: false,
      tokens: { accessToken, refreshToken },
    };
  } catch (err: any) {
    console.error("❌ Login failed:", err);

    let errorMessage = "로그인 중 오류가 발생했습니다.";

    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const kakaoSignup = async (): Promise<LoginResult> => {
  try {
    const token = await login(); // 카카오로부터 accessToken, refreshToken 획득

    // 백엔드로 전달
    const res = await axios.post(
      `${url}/api/auth/signup`,
      JSON.stringify({ accessToken: token.accessToken }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { accessToken, refreshToken } = await res.data;

    return {
      success: true,
      isNewUser: true,
      tokens: { accessToken, refreshToken },
    };
  } catch (err: any) {
    console.error("❌ Login failed:", err);

    let errorMessage = "회원가입 중 오류가 발생했습니다.";

    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.message) {
      errorMessage = err.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};
