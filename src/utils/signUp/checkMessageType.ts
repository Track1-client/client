import { signUpStep } from "../../core/signUp/signupStepType";

export function isMessageLogo(userType: string) {
  if(userType === signUpStep.SIGNUP_ROLE||signUpStep.SIGNUP_EMAIL_PASSWORD||signUpStep.SIGNUP_NICKNAME_CONVENTION){
    return true;
  }
}

export function isMessageWelcome(userType: string): boolean {
  return userType === signUpStep.SIGNUP_PROFILE;
}
