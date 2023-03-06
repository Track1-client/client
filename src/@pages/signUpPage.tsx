import { useState } from "react";
import styled from 'styled-components';
import BackButton from '../@components/@common/backButton';
import { SignBackgroundIc } from '../assets';
import Footer from '../@components/@common/footer';
import SignUpStepRenderer from '../@components/signUp/signUpStepRenderer';
import { signUpStep } from '../core/signUp/signupStepType';
import SignupMessage from "../@components/signUp/signupMessage";
import SignupStepHeader from "../@components/signUp/signupStepHeader";

export default function SignUpPage() {
    // type step= 'SIGNUP_ROLE' | 'SIGNUP_EMAIL' | 'SIGNUP_PASSWORD' | 'SIGNUP_NICKNAME' | 'SIGNUP_PROFILE' | 'SIGNUP_SUCCESS'
  const [step, setStep] = useState<string>(signUpStep.SIGNUP_ROLE);

    function endSignUp(){
        if (window.confirm('회원가입을 종료하겠습니까?'))
        {
            // clicked Yes
        }
    }

  return (
    <>
        <SignUpStepWrapper>
            <SignupMessage step={step}/>
            <StepBox>
                <SignupStepHeader step={step}/>
                <SignUpStepRenderer step={step} setStep={setStep} />
            </StepBox>
        </SignUpStepWrapper>
        <BackButtonWrapper onClick={endSignUp}>
            <BackButton/>
        </BackButtonWrapper>
        <SignBackgroundIcon/>
        <Footer/>
    </>
  )
}

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`

const SignBackgroundIcon=styled(SignBackgroundIc)`
    margin-top: 26.6rem;
`

const SignUpStepWrapper=styled.div`
    display: flex;
    position: absolute;
`

const StepBox=styled.div`
    width: 77.9rem;
    height: 88.8rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`
