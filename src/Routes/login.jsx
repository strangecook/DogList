import { useNavigate } from "react-router-dom";
import dogLoginPicture from "../Pictures/fatty-corgi-EpRAM95thHU-unsplash.jpg";
import googleLogo from "../Pictures/logo_google_icon.png"; // Google 로고 이미지 추가
import facebookLogo from "../Pictures/facebook_social media_social_icon.png"; // Facebook 로고 이미지 추가
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { LoginCover, DogLoginImage, LoginBox, Form, Input, SignUpButton, ErrorMessage, GoogleLoginButton, FacebookLoginButton, ButtonWrapper } from "../login/loginCss";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

  const generateUniqueNickname = async (nickname) => {
    let uniqueNickname = nickname;
    let exists = true;
    let attempt = 0;

    while (exists && attempt < 5) {
      const nicknameDoc = await getDoc(doc(db, "usernames", uniqueNickname));
      if (nicknameDoc.exists()) {
        uniqueNickname = `${nickname}${Math.floor(Math.random() * 10000)}`;
      } else {
        exists = false;
        console.log(`Nickname "${uniqueNickname}" is available.`);
      }
      attempt++;
    }

    if (exists) {
      console.error("Failed to generate a unique nickname.");
      throw new Error("닉네임을 생성할 수 없습니다.");
    }

    return uniqueNickname;
  };

  const handleOAuthLogin = async (provider) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      let nickname = user.displayName || `user_${user.uid.substring(0, 5)}`;
      console.log(`Initial nickname: "${nickname}"`);
      nickname = await generateUniqueNickname(nickname);

      await updateProfile(user, { displayName: nickname });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        nickname: nickname,
        email: user.email
      });

      await setDoc(doc(db, "usernames", nickname), { uid: user.uid });

      console.log("User login successful, navigating to home...");
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

  const handleGoogleLogin = () => handleOAuthLogin(new GoogleAuthProvider());
  const handleFacebookLogin = () => handleOAuthLogin(new FacebookAuthProvider());

  const getFirstErrorMessage = () => {
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    return null;
  };

  return (
    <LoginCover>
      <Helmet>
        <title>로그인 - Dog List</title>
        <meta name="description" content="Dog List에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요." />
        <meta name="keywords" content="로그인, Dog List, 강아지 정보" />
        <meta property="og:title" content="로그인 - Dog List" />
        <meta property="og:description" content="Dog List에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요." />
        <meta property="og:image" content="/mainImage.avif" />
        <meta property="og:url" content="https://www.doglist.info/login" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.doglist.info/login" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "로그인 - Dog List",
            "url": "https://www.doglist.info/login",
            "description": "Dog List에 로그인하여 다양한 강아지 품종에 대한 정보를 확인하세요."
          }
          `}
        </script>
      </Helmet>
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
        <ButtonWrapper>
          <GoogleLoginButton onClick={handleGoogleLogin} disabled={isLoading}>
            <img src={googleLogo} alt="Google Logo" style={{ width: "24px", marginRight: "8px" }} />
            {isLoading ? "로그인 중..." : "Google로 로그인"}
          </GoogleLoginButton>
          <FacebookLoginButton onClick={handleFacebookLogin} disabled={isLoading}>
            <img src={facebookLogo} alt="Facebook Logo" style={{ width: "24px", marginRight: "8px" }} />
            {isLoading ? "로그인 중..." : "Facebook으로 로그인"}
          </FacebookLoginButton>
        </ButtonWrapper>
        <SignUpButton onClick={moveToCreatePage}>회원가입</SignUpButton>
      </LoginBox>
    </LoginCover>
  );
}
