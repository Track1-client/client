import React from "react";
import { signUpStep } from "../../core/signUp/signupStepType";
import { StepUserPropsType } from "../../type/signUpStepTypes";
import ProfileEditInfo from "../@common/profileEditInfo";
import SignupEmailPassword from "./SignupEmailPassword";
import SignupNicknameConvention from "./signupNicknameConvention";
import SignupProfile from "./signupProfile";
import SignupRole from "./signupRole";
import SignupSuccess from "./signupSuccess";

export default function SignUpStepRenderer(props: StepUserPropsType) {
  const { step, setStep, userData, setUserData, userProfile, setUserProfile } = props;

  switch (step) {
    case signUpStep.SIGNUP_ROLE:
      return <SignupRole setStep={setStep} />;
    case signUpStep.SIGNUP_EMAIL_PASSWORD:
      return <SignupEmailPassword setStep={setStep} setUserData={setUserData} />;
    case signUpStep.SIGNUP_NICKNAME_CONVENTION:
      return <SignupNicknameConvention setStep={setStep} userData={userData} setUserData={setUserData} />;
    case signUpStep.SIGNUP_PROFILE:
      return <SignupProfile setStep={setStep} userProfile={userProfile} setUserProfile={setUserProfile} />;
    case signUpStep.SIGNUP_SUCCESS:
      return <SignupSuccess />;
    default:
      return <></>;
  }
}
