import styled, { css } from "styled-components";
import {
  ProducerDefaultModeToggleIc,
  ProducerModeToggleIc,
  EyeIc,
  ProducerLoginBtnIc,
  VocalLoginBtnIc,
  DefaultLoginBtnIc,
} from "../../assets";
import { useState } from "react";
import { signIn } from "../../core/api/login";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";

export default function LoginInput() {
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [emailInputState, setEmailInputState] = useState<string>("");
  const [passwordInputState, setPasswordInputState] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailDefaultState, setEmailDefaultState] = useState<boolean>(true);
  const [passwordDefaultState, setPasswordDefaultState] = useState<boolean>(true);
  const [emailWarningMessage, setEmailWarningMessage] = useState<string>("Enter a valid email");

  const EMAIL_RULE = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const PASSWORD_RULE = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{10,25}$/;

  const FOCUS = "focus";
  const BLUR = "blur";
  const WARNING = "warning";

  function producerToggleType() {
    return isProducerMode ? (
      <ProducerModeToggleIcon onClick={() => setIsProducerMode((prev) => !prev)} />
    ) : (
      <ProducerDefaultModeToggleIcon onClick={() => setIsProducerMode((prev) => !prev)} />
    );
  }

  function changeHoverEmailState(e: React.FocusEvent<HTMLInputElement>): void {
    const input = e.target.value;

    if (!EMAIL_RULE.test(input) && !isInputEmpty(input)) {
      setEmailInputState(WARNING);
      return;
    }

    e.type === FOCUS ? setEmailInputState(FOCUS) : setEmailInputState(BLUR);
  }

  function changeHoverPasswordState(e: React.FocusEvent<HTMLInputElement>): void {
    const input = e.target.value;

    if (!PASSWORD_RULE.test(input) && !isInputEmpty(input)) {
      setPasswordInputState(WARNING);
      return;
    }

    e.type === FOCUS ? setPasswordInputState(FOCUS) : setPasswordInputState(BLUR);
  }

  function validateEmail(e: React.ChangeEvent<HTMLInputElement>): void {
    const email = e.target.value;

    if (isInputEmpty(email)) {
      setEmailDefaultState(true);
      setEmailInputState(FOCUS);
    } else {
      setEmailDefaultState(false);
      EMAIL_RULE.test(email) ? setEmailInputState(FOCUS) : setEmailInputState(WARNING);
    }
  }

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    const password = e.target.value;

    isInputEmpty(password) ? setPasswordDefaultState(true) : setPasswordDefaultState(false);
    PASSWORD_RULE.test(password) || isInputEmpty(password)
      ? setPasswordInputState(FOCUS)
      : setPasswordInputState(WARNING);
  }

  const { mutate } = useMutation(login, {
    onSuccess: () => {
      console.log("로그인 성공~~~~헤헤헤헿");
    },
    onError: (error) => {
      console.log("에러!!", error);
      switch (error) {
        case "존재하지 않는 아이디입니다.":
          setEmailInputState(WARNING);
          setEmailWarningMessage("We don't have an account with that email address");
          break;

        case "잘못된 비밀번호입니다.":
          setPasswordInputState(WARNING);
          break;

        default:
          break;
      }
    },
  });

  async function login() {
    return await signIn("id", "pw");
  }

  function loginBtnType() {
    if (
      isWarningState(emailInputState) ||
      isWarningState(passwordInputState) ||
      emailDefaultState ||
      passwordDefaultState
    ) {
      return <DefaultLoginBtnIc />;
    } else {
      return isProducerMode ? (
        <ProducerLoginBtnIc onClick={() => mutate()} />
      ) : (
        <VocalLoginBtnIc onClick={() => mutate()} />
      );
    }
  }

  function isInputEmpty(input: string): boolean {
    return input === "";
  }

  function isWarningState(state: string): boolean {
    return state === WARNING;
  }

  return (
    <Container>
      <Wrapper>
        <Title>Log in</Title>
        <SubTitleWrapper>
          <span>If you are new user, </span>
          <StLink to="sign-up">Sign up here</StLink>
        </SubTitleWrapper>
        <InputBox>
          <InputTitle>Email</InputTitle>
          <InputWrapper>
            <Input
              type="text"
              placeholder="Enter your email address"
              onFocus={changeHoverEmailState}
              onBlur={changeHoverEmailState}
              onChange={validateEmail}
            />
          </InputWrapper>
          <UnderLine inputState={emailInputState} />
          {isWarningState(emailInputState) && <WarningMessage>{emailWarningMessage}</WarningMessage>}
        </InputBox>
        <InputBox>
          <InputTitle>Password</InputTitle>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Enter your password"
              onFocus={changeHoverPasswordState}
              onBlur={changeHoverPasswordState}
              onChange={validatePassword}
            />

            <EyeIcon onClick={() => setShowPassword((prev) => !prev)} />
          </InputWrapper>
          <UnderLine inputState={passwordInputState} />
          {isWarningState(passwordInputState) && (
            <WarningMessage>Wrong password.Try again or click Forgot password to reset it.</WarningMessage>
          )}
        </InputBox>
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        <LoginBtnWrapper>{loginBtnType()}</LoginBtnWrapper>

        <ForgotMessage to="/">Forgot password</ForgotMessage>
      </Wrapper>
    </Container>
  );
}

const Container = styled.article`
  position: absolute;
  top: 9.9rem;
  left: 96rem;

  height: 88.8rem;
  width: 77.9rem;

  background: rgba(20, 21, 23, 0.6);
  backdrop-filter: blur(1rem);

  border-radius: 5rem;
`;

const Wrapper = styled.div`
  margin: 10.9rem 11rem;
`;

const Title = styled.strong`
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`;

const SubTitleWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};

  margin-top: 3.3rem;
  margin-bottom: 2.3rem;
`;

const StLink = styled(Link)`
  color: ${({ theme }) => theme.colors.main};
`;

const InputBox = styled.div`
  margin-top: 5.9rem;
`;

const InputTitle = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray2};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 3rem;
`;

const Input = styled.input`
  height: 3.4rem;
  width: 100%;

  ${({ theme }) => theme.fonts.comment};

  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
  border: none;
`;

const WarningMessage = styled.span`
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.description};
  margin-top: 1.1rem;
`;

const UnderLine = styled.hr<{ inputState: string }>`
  border: 0.1rem solid;
  ${(props) => {
    switch (props.inputState) {
      case "focus":
        return css`
          border-color: ${({ theme }) => theme.colors.white};
        `;
      case "warning":
        return css`
          border-color: ${({ theme }) => theme.colors.red};
        `;
      default:
        return css`
          border-color: ${({ theme }) => theme.colors.gray3};
        `;
    }
  }}
`;

const ModeWrapper = styled.div`
  display: flex;
  align-items: center;

  float: right;

  margin-top: 5.2rem;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const LoginBtnWrapper = styled.div`
  margin-top: 16rem;

  cursor: pointer;
`;

const ForgotMessage = styled(Link)`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};

  margin-top: 3.2rem;
`;

const EyeIcon = styled(EyeIc)`
  cursor: pointer;
`;

const ProducerDefaultModeToggleIcon = styled(ProducerDefaultModeToggleIc)`
  cursor: pointer;
`;

const ProducerModeToggleIcon = styled(ProducerModeToggleIc)`
  cursor: pointer;
`;
