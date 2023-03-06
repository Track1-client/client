import { useState } from "react";
import styled from 'styled-components';
import Footer from '../@components/@common/footer';
import SignUpStepRenderer from '../@components/signUp/signUpStepRenderer';
import { signUpHeader, signUpStep } from '../core/signUp/signupStepType';
import SignupMessage from "../@components/signUp/signupMessage";
import SignupStepHeader from "../@components/signUp/signupStepHeader";
import ConventionModal from "../@components/@common/conventionModal";
import SignBackground from "../assets/icon/signUpBackgroundIc.svg";
import { conventionType } from "../core/convention/conventionType";
import { checkStepType } from "../utils/signUp/stepType";
import SignupSuccess from "../@components/signUp/signupSuccess";
import SignUpBackButton from "../@components/signUp/signUpBackButton";
import { isSignupSuccess } from "../utils/signUp/checkSignUpStep";
import { useRecoilValue } from 'recoil';
import { openConventionModal } from "../recoil/conventionModal";
import { UserDataPropsType } from "../type/signUpStepTypes";


export default function SignUpPage() {
    const background=SignBackground
    const [step, setStep] = useState<string>(signUpStep.SIGNUP_ROLE);
    const [userData, setUserData]=useState<UserDataPropsType>({
            imageFile:"",
            ID:"",
            PW:"",
            name:"",
    });
    const showModal=useRecoilValue(openConventionModal)

  return (
    <>
    {isSignupSuccess({step})?<SignupSuccess/>:(
        <SignUpPageWrapper>
            <BackButtonWrapper>
                <SignUpBackButton/>
            </BackButtonWrapper>
            <SignUpContainer background={background}>
                <SignUpStepWrapper>
                    <SignupMessage step={step} setStep={setStep} setUserData={setUserData}/>
                    <StepBox>
                        <SignupStepHeader step={step}/>
                        <SignUpStepRenderer step={step} setStep={setStep} userData={userData} setUserData={setUserData}/>
                    </StepBox>
                </SignUpStepWrapper>
            </SignUpContainer>
            <Footer/>
        </SignUpPageWrapper>
    )}

    {showModal&&(<ConventionModal/>)}
    </>
  )
}

const SignUpPageWrapper=styled.div`
    position: absolute;
`

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`

const SignUpContainer=styled.div<{background:string}>`
    width: 192rem;
    height: 98rem;

    background-image: url(${({background})=>background});
`

const SignUpStepWrapper=styled.div`
    display: flex;
`

const StepBox=styled.div`
    width: 77.9rem;
    height: 88.8rem;

    right: 18.1rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`
