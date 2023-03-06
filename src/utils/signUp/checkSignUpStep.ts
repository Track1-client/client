import { signUpHeader } from "../../core/signUp/signupStepType"
import { OnlyStepPropsType } from "../../type/signUpStepTypes"
import { checkStepType } from "./stepType"

export function isHeaderExist(props:OnlyStepPropsType){
    const {step}=props;
    return checkStepType(step)!==signUpHeader.FOUR
}

export function isStepOne(props:OnlyStepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.ONE
}

export function isStepTwo(props:OnlyStepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.TWO
}

export function isStepThree(props:OnlyStepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.THREE
}

export function isSignupSuccess(props:OnlyStepPropsType){
    const {step}=props;
    return checkStepType(step)===signUpHeader.FIVE
}
