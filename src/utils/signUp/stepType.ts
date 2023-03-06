import { signUpHeader, signUpStep } from "../../core/signUp/signupStepType";

export function checkStepType(stepType: string) {
    switch(stepType){
        case signUpStep.SIGNUP_ROLE:
            return signUpHeader.ONE
        case signUpStep.SIGNUP_EMAIL_PASSWORD:
            return signUpHeader.TWO
        case signUpStep.SIGNUP_NICKNAME_CONVENTION:
            return signUpHeader.THREE
        case signUpStep.SIGNUP_PROFILE:
            return signUpHeader.FOUR
        case signUpStep.SIGNUP_SUCCESS:
            return signUpHeader.FIVE
    }
}
