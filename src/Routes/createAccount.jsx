import { useForm } from "react-hook-form";
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    /* 스타일 추가 */
`;

const Form = styled.form`
    /* 스타일 추가 */
`;

const Input = styled.input`
    /* 스타일 추가 */
`;

export default function CreateAccount() {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);
        console.log(data);
        // 서버 요청 등의 비동기 작업을 처리 후 isLoading 상태를 false로 설정
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('name')}
                    name="name"
                    placeholder="이름"
                    type="text"
                />
                <Input
                    {...register('email')}
                    name="email"
                    placeholder="이메일"
                    type="email"
                />
                <Input
                    {...register('password')}
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                />
                <Input
                    {...register('confirmPassword')}
                    name="confirmPassword"
                    placeholder="비밀번호 확인"
                    type="password"
                />
                <Input
                    type="submit"
                    value={isLoading ? "계정 생성 중..." : "계정 생성하기"}
                    disabled={isLoading}
                />
            </Form>
        </Wrapper>
    );
}
