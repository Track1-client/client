import React from 'react'
import styled from 'styled-components'
import { SignUpContinueButtonIc } from '../../assets'
import { signUpStep } from '../../core/signUp/signupStepType'
import { ContinueButtonPropsTypes } from '../../type/signUpStepTypes'

export default function ContinueButton(props:ContinueButtonPropsTypes) {
    const {successNextStep, step, setStep}=props

    function isNotNull(answer:string){
        return answer!==''
    }

    function moveNextStep(){
        isNotNull(successNextStep)&&setStep(step)
    }

  return (
    <ContinueButtonWrapper type="button" isNotNull={isNotNull(successNextStep)} onClick={moveNextStep}>
        <SignUpContinueButtonIc/>
    </ContinueButtonWrapper>
  )
}

const ContinueButtonWrapper=styled.button<{isNotNull:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 17rem;
    height: 4.6rem;

    margin: 10.8rem 0 0 49.8rem;

    border-radius: 2.5rem;
    border: 0.1rem solid ${({ theme, isNotNull }) => isNotNull?theme.colors.main:theme.colors.gray4};
    background-color: ${({ theme, isNotNull }) => isNotNull?theme.colors.main:theme.colors.gray4};
`