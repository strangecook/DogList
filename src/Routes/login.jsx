import { useNavigate } from "react-router-dom";
import dogLoginPicture from "../Pictures/fatty-corgi-EpRAM95thHU-unsplash.jpg";
import googleLogo from "../Pictures/logo_google_icon.png"; // Google 로고 이미지를 추가
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { LoginCover, DogLoginImage, LoginBox, Form, Input, SignUpButton, ErrorMessage, GoogleLoginButton } from "../login/loginCss"; // GoogleLoginButton 추가
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const moveToCreatePage = () => {
    navigate("/CreateAccount");
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.log(errorCode);
        setErrorMessage(`Error: ${errorCode}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.log(errorCode);
        setErrorMessage(`Error: ${errorCode}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getFirstErrorMessage = () => {
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    return null;
  };

  return (
    <LoginCover>
      <DogLoginImage src={dogLoginPicture} alt="dog" />
      <LoginBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", {
              required: "이메일을 입력하세요",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "유효한 이메일 주소를 입력하세요"
              }
            })}
            name="email"
            placeholder="이메일"
            type="email"
          />
          <Input
            {...register("password", {
              required: "비밀번호를 입력하세요",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다"
              }
            })}
            name="password"
            placeholder="비밀번호"
            type="password"
          />
          {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Input
            type="submit"
            value={isLoading ? "계정 확인 중..." : "로그인"}
            disabled={isLoading}
          />
        </Form>
        <SignUpButton onClick={moveToCreatePage}>회원가입</SignUpButton>
        <GoogleLoginButton onClick={handleGoogleLogin} disabled={isLoading}>
          <img src={googleLogo} alt="Google Logo" style={{ width: "24px", marginRight: "8px" }} />
          {isLoading ? "로그인 중..." : "Google로 로그인"}
        </GoogleLoginButton>
      </LoginBox>
    </LoginCover>
  );
}
