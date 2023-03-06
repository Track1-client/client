import { signUpHeader } from "../../core/signUp/signupStepType"
import { StepPropsType } from "../../type/signUpStepTypes"
import { checkStepType } from "./stepType"

export function isHeaderExist(props:StepPropsType){
    const {step}=props;
    return checkStepType(step)!==signUpHeader.FOUR
}

export function isStepOne(props:StepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.ONE
}

export function isStepTwo(props:StepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.TWO
}

export function isStepThree(props:StepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.THREE
}

export function isSignupSuccess(props:StepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.FIVE
}
