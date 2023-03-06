import styled, { css } from "styled-components";
import {
  RequestResetPasswordDefaultBtnIc,
  ForgotPasswordTitleIc,
  RequestResetPasswordProducerBtnIc,
  RequestResetPasswordVocalBtnIc,
  ResendPasswordProducerBtnIc,
  ResendPasswordVocalBtnIc,
  ProducerModeToggleIc,
  ProducerDefaultModeToggleIc,
} from "../../assets";
import { useEffect, useState } from "react";
import { useSendNewPasswordEmail } from "../../utils/hooks/useSendNewPasswordEmail";

export default function ForgotPasswordInput() {
  const [email, setEmail] = useState<string>("");
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [userType, setUserType] = useState<string>("vocal");
  const [resendTrigger, setResendTrigger] = useState<boolean>(false);

  const { mutate, isSuccess } = useSendNewPasswordEmail(userType, email);

  useEffect(() => {
    isProducerMode ? setUserType("producer") : setUserType("vocal");
  }, [isProducerMode]);

  useEffect(() => {
    isSuccess && setResendTrigger(true);
  }, [isSuccess]);

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;
    setEmail(email);
  }

  function producerToggleType() {
    return isProducerMode ? (
      <ProducerModeToggleIcon onClick={() => setIsProducerMode((prev) => !prev)} />
    ) : (
      <ProducerDefaultModeToggleIcon onClick={() => setIsProducerMode((prev) => !prev)} />
    );
  }

  function requestBtnType() {
    if (false) {
      return <RequestResetPasswordDefaultBtnIcon onClick={() => console.log()} />;
    }
    if (resendTrigger) {
      return isProducerMode ? (
        <ResendPasswordProducerBtnIcon onClick={() => mutate()} />
      ) : (
        <ResendPasswordVocalBtnIcon onClick={() => mutate()} />
      );
    } else {
      return isProducerMode ? (
        <RequestResetPasswordProducerBtnIcon onClick={() => mutate()} />
      ) : (
        <RequestResetPasswordVocalBtnIcon onClick={() => mutate()} />
      );
    }
  }

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <ForgotPasswordTitleIc />
        </TitleWrapper>
        <InputWrapper>
          <InputTitle>What's your email</InputTitle>
          <Input placeholder="Enter your email address" onChange={validateEmail} />
          <UnderLine />
        </InputWrapper>
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        <RequestBtnWrapper>{requestBtnType()}</RequestBtnWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 29.4rem;
  left: 0;
  right: 0;
  margin: 0 auto;

  height: 57rem;
  width: 77.9rem;

  backdrop-filter: blur(1rem);
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Wrapper = styled.div`
  margin: 0 11rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 9.1rem;
`;

const InputWrapper = styled.div`
  margin-top: 6.4rem;
`;

const InputTitle = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray2};
`;

const Input = styled.input`
  height: 3.4rem;
  width: 100%;

  margin-top: 2.99rem;

  ${({ theme }) => theme.fonts.comment};
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  border: none;
`;

const UnderLine = styled.hr`
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.colors.gray3};
`;

const ModeWrapper = styled.div`
  display: flex;
  align-items: center;
  float: right;
  margin: 4.2rem 0 3.1rem;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const RequestBtnWrapper = styled.div`
  margin-top: 2.2rem;
`;

const RequestResetPasswordDefaultBtnIcon = styled(RequestResetPasswordDefaultBtnIc)`
  cursor: pointer;
`;

const RequestResetPasswordProducerBtnIcon = styled(RequestResetPasswordProducerBtnIc)`
  cursor: pointer;
`;

const RequestResetPasswordVocalBtnIcon = styled(RequestResetPasswordVocalBtnIc)`
  cursor: pointer;
`;

const ProducerDefaultModeToggleIcon = styled(ProducerDefaultModeToggleIc)`
  cursor: pointer;
`;

const ProducerModeToggleIcon = styled(ProducerModeToggleIc)`
  cursor: pointer;
`;

const ResendPasswordProducerBtnIcon = styled(ResendPasswordProducerBtnIc)`
  cursor: pointer;
`;

const ResendPasswordVocalBtnIcon = styled(ResendPasswordVocalBtnIc)`
  cursor: pointer;
`;
