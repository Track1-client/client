import { signUpStep } from "../../core/signUp/signupStepType";

export function isMessageLogo(stepType: string):boolean {
  switch(stepType){
    case signUpStep.SIGNUP_ROLE:
      return true;
    case signUpStep.SIGNUP_EMAIL_PASSWORD:
      return true;
    case signUpStep.SIGNUP_NICKNAME_CONVENTION:
      return true;
    default:
      return false;
  }
}

export function isMessageWelcome(stepType: string): boolean {
  return stepType === signUpStep.SIGNUP_PROFILE;
}
