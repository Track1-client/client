import React from 'react'
import { signUpStep } from '../../core/signUp/signupStepType';
import { StepPropsTypes } from '../../type/signUpStepTypes';
import SignupEmailPassword from './signupEmailPassword';
import SignupRole from './signupRole';

export default function SignUpStepRenderer(props:StepPropsTypes) {
  const { step,setStep } = props;

    switch (step) {
        case signUpStep.SIGNUP_ROLE:
          return <SignupRole setStep={setStep} />;
        case signUpStep.SIGNUP_EMAIL_PASSWORD:
          return <SignupEmailPassword setStep={setStep} />;
        // case signUpStep.SIGNUP_NICKNAME_CONVENTION:
        //   return <SignupNicknameConvention setStep={setStep} />;
        // case signUpStep.SIGNUP_PROFILE:
        //     return <SignupProfile setStep={setStep} />;
        // case signUpStep.SIGNUP_SUCCESS:
        //     return <SignupSuccess setStep={setStep} />;  
        default:
          return <SignupRole setStep={setStep} />;
      }
}
