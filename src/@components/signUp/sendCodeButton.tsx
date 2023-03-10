import React from 'react'
import styled from 'styled-components'
import { SignUpResendButtonIc, SignupSendcodeTextIc } from '../../assets'

interface ButtonPropsType{
  isEmailSuccess:boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  isSendCode:boolean;
  isResendCode:boolean;
}

export default function SendCodeButton(props:ButtonPropsType) {
  const {isEmailSuccess, onClick, isSendCode, isResendCode}=props;

  function isActive(){
    if(isEmailSuccess||isSendCode||isResendCode){
      return true
    }
    else{
      return false
    }
  }

  return (
    <ButtonWrapper isActive={isActive()} onClick={onClick}>
        {isSendCode?<SignUpResendButtonIcon/>:<SignupSendcodeTextIcon/>}
    </ButtonWrapper>
  )
}

const ButtonWrapper=styled.button<{isActive:boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 12.7rem;
    height: 4rem;

    margin: 2.4rem 0 0 1rem;

    border-radius: 5rem;
    background-color: ${({ theme,isActive }) => isActive?theme.colors.main:theme.colors.gray4};
`

const SignupSendcodeTextIcon=styled(SignupSendcodeTextIc)`
  width: 9.3rem;
`

const SignUpResendButtonIcon=styled(SignUpResendButtonIc)`
  width: 6.3rem;
`