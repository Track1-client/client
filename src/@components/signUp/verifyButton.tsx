import React from 'react'
import styled from 'styled-components'
import { SignUpVerifyButtonIc } from '../../assets'
import { verificationCodeInvalidMessage } from '../../core/userInfoErrorMessage/verificationCodeInvalidMessage';

interface VerifyPropsType{
    verificationCodeMessage:string
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function VerifyButton(props:VerifyPropsType) {
    const {verificationCodeMessage, onClick}=props;

    function isActive(){
        return verificationCodeMessage!==verificationCodeInvalidMessage.NULL;
    }
    
  return (
    <ButtonWrapper isActive={isActive()} onClick={onClick}>
        <SignUpVerifyButtonIcon/>
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

const SignUpVerifyButtonIcon=styled(SignUpVerifyButtonIc)`
    width: 5rem;
`