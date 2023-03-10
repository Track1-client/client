import styled, { css } from "styled-components";
import {
  ProducerDefaultModeToggleIc,
  ProducerModeToggleIc,
  EyeIc,
  ProducerLoginBtnIc,
  VocalLoginBtnIc,
  DefaultLoginBtnIc,
  LoginTitleIc,
  IfyourareanewuserIc,
  SignuphereIc,
  LoginforgotpasswordIc,
  LoginEmailIc,
  LoginPasswordIc,
} from "../../assets";
import { useEffect, useState } from "react";
import { onLogin, onLoginSuccess } from "../../core/api/login";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { setCookie } from "../../utils/cookie";
import { LoginUserId, LoginUserType } from "../../recoil/loginUserData";
import { accessToken } from "../../recoil/token";
import { useSetRecoilState } from "recoil";

export default function LoginInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isProducerMode, setIsProducerMode] = useState<boolean>(false);
  const [emailInputState, setEmailInputState] = useState<string>("");
  const [passwordInputState, setPasswordInputState] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>("vocal");

  const [emailWarningMessage, setEmailWarningMessage] = useState<string>("Enter a valid email");

  // const [token, setToken] = useSetRecoilState<string>(accessToken);

  const EMAIL_RULE = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const PASSWORD_RULE = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{10,25}$/;

  const FOCUS = "focus";
  const BLUR = "blur";
  const WARNING = "warning";

  const setLoginUserType = useSetRecoilState(LoginUserType);
  const setLoginUserId = useSetRecoilState(LoginUserId);

  useEffect(() => {
    isProducerMode ? setLoginType("producer") : setLoginType("vocal");
  }, [isProducerMode]);

  const { mutate } = useMutation(() => onLogin(email, password, loginType), {
    onSuccess: (data) => {
      if (data?.data.status === 200) {
        const accessToken = data.data.data.accessToken;
        setLoginUserType(data.data.data.tableName);
        setLoginUserId(data.data.data.id);
        setCookie("accessToken", accessToken, {}); //??????????????????~
        onLoginSuccess();
        navigate("/");
      }
    },
    onError: (error: any) => {
      alert(error?.response.data.message);
    },
  });

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
    const emailInput = e.target.value;
    setEmail(emailInput);

    if (isInputEmpty(emailInput)) {
      setEmailInputState(FOCUS);
    } else {
      EMAIL_RULE.test(emailInput) ? setEmailInputState(FOCUS) : setEmailInputState(WARNING);
    }
  }

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>): void {
    const passwordInput = e.target.value;

    setPassword(passwordInput);

    PASSWORD_RULE.test(passwordInput) || isInputEmpty(passwordInput)
      ? setPasswordInputState(FOCUS)
      : setPasswordInputState(WARNING);
  }

  function loginBtnType() {
    if (
      !isWarningState(emailInputState) &&
      !isWarningState(passwordInputState) &&
      !isInputEmpty(email) &&
      !isInputEmpty(password)
    ) {
      return isProducerMode ? (
        <ProducerLoginBtnIcon onClick={() => mutate()} />
      ) : (
        <VocalLoginBtnIcon onClick={() => mutate()} />
      );
    }
    return <DefaultLoginBtnIcon />;
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
        <LoginTitleIcon />
        <SubTitleWrapper>
          <IfyourareanewuserIcon />
          <Link to="sign-up">
            <SignuphereIcon />
          </Link>
        </SubTitleWrapper>
        <InputBox marginTop={8}>
          <LoginEmailIcon />
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
          {isWarningState(emailInputState) ? (
            <WarningMessage isWarning={true}>{emailWarningMessage}</WarningMessage>
          ) : (
            <WarningMessage isWarning={false}>null</WarningMessage>
          )}
        </InputBox>
        <InputBox marginTop={2.9}>
          <LoginPasswordIcon />
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
          {isWarningState(passwordInputState) ? (
            <WarningMessage isWarning={true}>
              Wrong password.Try again or click Forgot password to reset it.
            </WarningMessage>
          ) : (
            <WarningMessage isWarning={false}>null</WarningMessage>
          )}
        </InputBox>
        <ModeWrapper>
          <ModeText>Producer Mode</ModeText>
          {producerToggleType()}
        </ModeWrapper>
        <LoginBtnWrapper>{loginBtnType()}</LoginBtnWrapper>

        <ForgotMessage to="/forgotPassword">
          <LoginforgotpasswordIc />

        </ForgotMessage>
      </Wrapper>
    </Container>
  );
}

const Container = styled.article`
  position: absolute;
  top: 9.9rem;
  left: 96rem;

  width: 77.9rem;
  height: 88.8rem;

  right: 18.1rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Wrapper = styled.div`
  margin: 10.9rem 11rem;
`;

const SubTitleWrapper = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body1};

  margin-top: 3.3rem;
  margin-bottom: 2.3rem;
`;

const InputBox = styled.div<{ marginTop: number }>`
  margin-top: ${({ marginTop }) => marginTop}rem;
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

const WarningMessage = styled.span<{ isWarning: boolean }>`
  color: ${({ theme, isWarning }) => (isWarning ? theme.colors.red : "transparent")};
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

  margin-top: 3rem;
`;

const ModeText = styled.div`
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
  margin: 0 1.2rem;
`;

const LoginBtnWrapper = styled.div`
  margin-top: 13rem;

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

const LoginTitleIcon=styled(LoginTitleIc)`
  width: 19.5rem;
`

const IfyourareanewuserIcon=styled(IfyourareanewuserIc)`
  width: 26.5rem;
`

const SignuphereIcon=styled(SignuphereIc)`
  width: 17.5rem;
`

const LoginEmailIcon=styled(LoginEmailIc)`
  width: 5.2rem;
`

const LoginPasswordIcon=styled(LoginPasswordIc)`
  width: 10.7rem;
`

const DefaultLoginBtnIcon=styled(DefaultLoginBtnIc)`
  width: 56.1rem;
`

const ProducerLoginBtnIcon=styled(ProducerLoginBtnIc)`
  width: 56.1rem;
`

const VocalLoginBtnIcon=styled(VocalLoginBtnIc)`
  width: 56.1rem;
`

const LoginforgotpasswordIcon=styled(LoginforgotpasswordIc)`
  width: 20rem;

  margin-top: -2rem;
`