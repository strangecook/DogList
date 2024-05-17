import dogLoginPicture from "../Pictures/fatty-corgi-Zn5chZcnFRA-unsplash.jpg";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Wrapper, BackgroundImage, FormBox, Form, Input, ErrorMessage } from "../createAccount/createAccountCss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function CreateAccount() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // Add state for error message

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage(null); // Reset error message on submit

    if (isLoading || data.email === "" || data.password === "" || data.password.length < 5) return;

    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(credential.user, {
        displayName: data.name
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorCode = e.code;
        console.log(errorCode);
        setErrorMessage(`Error: ${errorCode}`); // Set error message state
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get the first error message
  const getFirstErrorMessage = () => {
    if (errors.name) return errors.name.message;
    if (errors.email) return errors.email.message;
    if (errors.password) return errors.password.message;
    if (errors.confirmPassword) return errors.confirmPassword.message;
    return null;
  };

  return (
    <Wrapper>
      <BackgroundImage src={dogLoginPicture} alt="dog" />
      <FormBox>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", { required: "이름을 입력하세요" })}
            name="name"
            placeholder="이름"
            type="text"
          />
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
          <Input
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력하세요",
              validate: (value) => value === getValues("password") || "비밀번호가 일치하지 않습니다"
            })}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            type="password"
          />
          {getFirstErrorMessage() && <ErrorMessage>{getFirstErrorMessage()}</ErrorMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Render error message if exists */}
          <Input
            type="submit"
            value={isLoading ? "계정 생성 중..." : "계정 생성하기"}
            disabled={isLoading}
          />
        </Form>
      </FormBox>
    </Wrapper>
  );
}
