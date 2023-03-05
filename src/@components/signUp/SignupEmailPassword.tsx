import React from 'react'
import styled from 'styled-components';
import { ConfirmPasswordTextIc, CreateAPasswordForYourAccountTitleIc, SignUpBackArrowIc, SignUpEmailTitleIc, SignUpErrorIc, SignUpEyeIc, SignUpEyeXIc, SignUpPasswordIc, SignUpVerifyIc, VerificationCodeTextIc, WeSentYouACodeTextIc, WhatsYourEmailIc } from '../../assets';
import { SetPropsType } from '../../type/signUpStepTypes';
import { useState } from 'react';
import SendCodeButton from './sendCodeButton';
import { emailInvalidMessage } from '../../core/userInfoErrorMessage/emailInvalidMessage';
import { checkEmailForm } from '../../utils/errorMessage/checkEmailForm';
import { authEmail, repostAuthEmail, checkEmailDuplication, postVerifyCode } from '../../core/api/signUp';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import VerifyButton from './verifyButton';
import ContinueButton from './continueButton';
import { signUpStep } from '../../core/signUp/signupStepType';
import { verificationCodeInvalidMessage } from '../../core/userInfoErrorMessage/verificationCodeInvalidMessage';
import { setInputUnderline, setMessageColor } from '../../utils/errorMessage/setInputStyle';
import { passwordInvalidMessage } from '../../core/userInfoErrorMessage/passwordInvalidMessage';
import { checkPasswordForm } from '../../utils/errorMessage/checkPasswordForm';
import { passwordConfirmType } from '../../core/signUp/passwordConfirm';
import { continueType } from '../../core/signUp/continueType';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/main';

export default function SignupEmailPassword(props:SetPropsType) {
    const {setStep, setUserData}=props;
    const [email, setEmail]=useState<string>('')
    const [emailMessage, setEmailMessage]=useState<string>(emailInvalidMessage.NULL)
    const [isValidForm, setIsValidForm]=useState<boolean>(false);
    const [password, setPassword]=useState<string>('')
    const [passwordMessage, setPasswordMessage]=useState<string>(passwordInvalidMessage.NULL)
    const [isSendCode, setIsSendCode]=useState<boolean>(false)
    const [isResendCode, setIsResendCode]=useState<boolean>(false)
    const [verificationCode, setVerificationCode]=useState<string>('')
    const [verificationCodeMessage, setVerificationCodeMessage]=useState<string>(verificationCodeInvalidMessage.NULL)
    const [isVerify, setIsVerify]=useState<boolean>(false)
    const [passwordConfirm, setPasswordConfirm]=useState<string>('')
    const [passwordConfirmMessage, setPasswordConfirmMessage]=useState<string>(passwordInvalidMessage.NULL)
    const [isShowPassword, setIsShowPassword]=useState<boolean>(false)
    const [isShowPasswordConfirm, setIsShowPasswordConfirm]=useState<boolean>(false)
    const tableName=useRecoilValue<string>(UserType)
    const [isVerifyClicked, setIsVerifyClicked]=useState<boolean>(false);
   
    function writeEmail(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setEmailMessage(emailInvalidMessage.NULL)
        }

        else if(!checkEmailForm(e.target.value)){
            setEmailMessage(emailInvalidMessage.FORM)
        }

        else if(checkEmailForm(e.target.value)){
            setEmail(e.target.value)
            setIsValidForm(prev=>!prev);
        }

       
        setEmail(e.target.value)
    }

    //auth-mail post
    const PostAuthMail = useMutation(authEmail, {
        onSuccess: () => {
        queryClient.invalidateQueries("email");
        setEmailMessage(emailInvalidMessage.SUCCESS)
        setEmail(email)
        },
        onError:(error)=>{
            console.log(error)
        }
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        let formData = new FormData();
        formData.append("tableName", tableName);
        formData.append("userEmail", email);
        PostAuthMail.mutate(formData);
    }, [isSendCode]);
    //auth-mail post end

    //mail duplicate post
    const CheckDuplication = useMutation(checkEmailDuplication, {
        onSuccess: () => {
        queryClient.invalidateQueries("email-duplicate");
        // console.log(CheckDuplication.data?.data.data.isDuplicate)
        CheckDuplication.data?setEmailMessage(emailInvalidMessage.DUPLICATION):setEmailMessage(emailInvalidMessage.SUCCESS);
        console.log(emailMessage)
        },
        onError:(error)=>{
        }
    });

    useEffect(()=>{
        // console.log(emailMessage);
    }, [emailMessage])

    useEffect(() => {
        let formData = new FormData();
        formData.append("tableName", tableName);
        formData.append("userEmail", email);
        CheckDuplication.mutate(formData);
    }, [isValidForm]);
    //mail duplicate end

    //auth-mail-repost
    const RepostAuthMail = useMutation(repostAuthEmail, {
        onSuccess: () => {
        queryClient.invalidateQueries("email-repost");
        setEmailMessage(emailInvalidMessage.SUCCESS)
        setEmail(email)
        },
        onError:()=>{
            // setEmailMessage(emailInvalidMessage.DUPLICATION)
        }
    });

    useEffect(() => {
        let formData = new FormData();
        formData.append("tableName", tableName);
        formData.append("userEmail", email);
        RepostAuthMail.mutate(formData);
    }, [isResendCode]);
    //auth-mail post end

    function writePassword(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setPasswordMessage(passwordInvalidMessage.NULL)
        }

        else if(!checkPasswordForm(e.target.value)){
            setPasswordMessage(passwordInvalidMessage.FORM)
        }

        else if(checkPasswordForm(e.target.value)){
            setPasswordMessage(passwordInvalidMessage.SUCCESS)
        }

        setPassword(e.target.value)
    }

    function writePasswordConfirm(e: React.ChangeEvent<HTMLInputElement>){
        if(!e.target.value){
            setPasswordConfirmMessage(passwordInvalidMessage.NULL)
        }

        else if(e.target.value!==password){
            setPasswordConfirmMessage(passwordInvalidMessage.MATCH)
        }

        else if(e.target.value===password){
            setPasswordConfirmMessage(passwordInvalidMessage.SUCCESS)
        }

        setPasswordConfirm(e.target.value)
    }

    function writeVerificationCode(e: React.ChangeEvent<HTMLInputElement>){
        // setIsVerifyClicked(prev=>!prev)
        // console.log(e.target.value)
        if(!e.target.value){
            setVerificationCodeMessage(verificationCodeInvalidMessage.NULL)
        }
        else{
            // setVerificationCodeMessage(verificationCodeInvalidMessage.ERROR)
            // if("a"+PostAuthMail.error==="aAxiosError: Request failed with status code 400"){
            //     setVerificationCodeMessage(verificationCodeInvalidMessage.ERROR)
            // }
            if(!PostAuthMail.isError){
                setVerificationCodeMessage(verificationCodeInvalidMessage.SUCCESS)
            }
            else{
                setVerificationCodeMessage(verificationCodeInvalidMessage.ERROR)
            }
        }
        setVerificationCode(e.target.value)
    }

    function isEmailSuccess(){
        return emailMessage===emailInvalidMessage.SUCCESS
    }

    function sendCode(e: React.MouseEvent){
        //post함수 추가
        setIsSendCode(true)
        setEmailMessage(emailInvalidMessage.TIME)
        console.log(emailMessage)
        setIsVerify(false)
        setIsResendCode((prev)=>prev)
    }

    function verifyCode(e: React.MouseEvent){
        // setIsVerifyClicked(prev=>!prev)
        setIsVerify(true);
        setEmailMessage(emailInvalidMessage.VERIFY)
    }

    //verifycode post
    const VerifyCode = useMutation(postVerifyCode, {
        onSuccess: () => {
        queryClient.invalidateQueries("email");
        
        setVerificationCodeMessage(verificationCodeInvalidMessage.SUCCESS)
        },
        onError:(error)=>{
            console.log(error)
            // if("a"+PostAuthMail.error==="aAxiosError: Request failed with status code 400"){
            //     console.log("asdfdsafdsa")
                setVerificationCodeMessage(verificationCodeInvalidMessage.ERROR)
                // alert("유효 인증 시간이 지났습니다");
            // }
        }
    });

    useEffect(() => {
        console.log("클릭완료")
        let formData = new FormData();
        formData.append("tableName", tableName);
        formData.append("userEmail", email);
        formData.append("verificationCode", verificationCode);
        VerifyCode.mutate(formData);
    }, [verificationCode]);
    //verifycode end

    function backToRole(){
        setStep(signUpStep.SIGNUP_ROLE)
    }

    function setErrorIcon(message:string){ 
        switch (message) {
            case emailInvalidMessage.FORM:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.DUPLICATION:
                return <SignUpErrorIc/>;
            case verificationCodeInvalidMessage.ERROR:
                return <SignUpErrorIc/>;
            case passwordInvalidMessage.FORM:
                return <SignUpErrorIc/>;
            case passwordInvalidMessage.MATCH:
                return <SignUpErrorIc/>;
            case emailInvalidMessage.VERIFY:
                return <SignUpVerifyIc/>; 
            case passwordInvalidMessage.SUCCESS:
                return <SignUpVerifyIc/>; 
            case emailInvalidMessage.SUCCESS:
                return ;    
            default:
                return ;
        }
    }

    function showPassword(type:string){
        if(type===passwordConfirmType.PASSWORD){
            setIsShowPassword(prev=>!prev)
        }
        else if(type===passwordConfirmType.PASSWORD_CONFIRM){
            setIsShowPasswordConfirm(prev=>!prev)
        }
    }

    function setPasswordInputType(isShow:boolean){
        return(
            isShow?"text":"password"
        )
    }

    function successNextStep(){
        return (
            passwordConfirmMessage===passwordInvalidMessage.SUCCESS?continueType.SUCCESS:continueType.FAIL
        )
    }

    function showTitle(){
        if(isSendCode&&!isVerify){
            return <WeSentYouACodeTextIc/>
        }

        else if(isVerify){
            return <CreateAPasswordForYourAccountTitleIc/>
        }
        
        else{
            return <SignUpEmailTitleIc/>
        }
    }

  return (
    <>
        <TitleWrapper>
            {showTitle()}
        </TitleWrapper>

        <SignupEmailWrapper>

            <WhatsYourEmailIcon/>
            <InputWrapper>
                <Input type="email" placeholder="Enter your email address" width={42.2} underline={setInputUnderline(emailMessage)} onChange={writeEmail}/>
                {setErrorIcon(emailMessage)&&(
                    <IconWrapper marginLeft={-3.9}>
                        {setErrorIcon(emailMessage)}
                    </IconWrapper>
                )}
                <SendCodeButton isEmailSuccess={isEmailSuccess()} onClick={(e: React.MouseEvent<HTMLElement>) => sendCode(e)} isSendCode={isSendCode} isResendCode={isResendCode}/>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(emailMessage)}>
                {emailMessage}
            </MessageWrapper>

            {isSendCode&&!isVerify&&(
                <>
                <VerificationCodeTextIcon/>
                <InputWrapper>
                    <Input type="text" placeholder="Verify your email address" width={42.2} underline={setInputUnderline(verificationCodeMessage)} onChange={writeVerificationCode}/>
                    {setErrorIcon(verificationCodeMessage)&&(
                        <IconWrapper marginLeft={-3.9}>
                            {setErrorIcon(verificationCodeMessage)}
                        </IconWrapper>
                    )}
                    <VerifyButton verificationCodeMessage={verificationCodeMessage} onClick={(e: React.MouseEvent<HTMLElement>) => verifyCode(e)}/>
                </InputWrapper>
                <MessageWrapper textColor={setMessageColor(verificationCodeMessage)}>
                    {verificationCodeMessage}
                </MessageWrapper>
                </>
            )}

            <SignUpPasswordIcon/>
            <InputWrapper>
                <Input type={setPasswordInputType(isShowPassword)} placeholder="Create a password" width={56} underline={setInputUnderline(passwordMessage)} onChange={writePassword}/>
                {setErrorIcon(passwordMessage)&&(
                    <IconWrapper marginLeft={-8.4}>
                        {setErrorIcon(passwordMessage)}
                    </IconWrapper>
                )}
                <EyeIcWrapper onClick={()=>showPassword(passwordConfirmType.PASSWORD)}>
                    {isShowPassword?<SignUpEyeXIc/>:<SignUpEyeIc/>}
                </EyeIcWrapper>
            </InputWrapper>
            <MessageWrapper textColor={setMessageColor(passwordMessage)}>
                {passwordMessage}
            </MessageWrapper>

            {isVerify&&(
                <>
                <ConfirmPasswordTextIcon/>
                <InputWrapper>
                    <Input type={setPasswordInputType(isShowPasswordConfirm)} placeholder="Enter a password again" width={56} underline={setInputUnderline(passwordConfirmMessage)} onChange={writePasswordConfirm}/>
                    {setErrorIcon(passwordConfirmMessage)&&(
                        <IconWrapper marginLeft={-8.4}>
                            {setErrorIcon(passwordConfirmMessage)}
                        </IconWrapper>
                    )}
                    <EyeIcWrapper onClick={()=>showPassword(passwordConfirmType.PASSWORD_CONFIRM)}>
                        {isShowPasswordConfirm?<SignUpEyeXIc/>:<SignUpEyeIc/>}
                    </EyeIcWrapper>
                </InputWrapper>
                <MessageWrapper textColor={setMessageColor(passwordConfirmMessage)}>
                    {passwordConfirmMessage}
                </MessageWrapper>  
                </>              
            )}

        </SignupEmailWrapper>
        <ArrowButtonWrapper>
            <SignUpBackArrowIcon onClick={backToRole}/>
            <ContinueButton successNextStep={successNextStep()} step={signUpStep.SIGNUP_NICKNAME_CONVENTION} setStep={setStep}/>
        </ArrowButtonWrapper>
    </>
  )
}

const TitleWrapper=styled.section`
    display: flex;
    justify-content: center;

    margin-top:7.65rem;
`

const WhatsYourEmailIcon=styled(WhatsYourEmailIc)`
    margin-top: 5.96rem;
`

const SignUpPasswordIcon=styled(SignUpPasswordIc)`
    margin-top: 3.2rem;
`

const SignupEmailWrapper=styled.div`
    display: flex;
    flex-direction: column;

    margin-left:11rem;
`

const Input=styled.input<{width:number, underline:string}>`
    display: flex;
    align-items: center;

    padding: 3rem 0 0.5rem 0;

    width: ${({width})=>width}rem;
    
    border-bottom: 0.1rem solid ${({underline})=>underline};

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray4};
    }
`

const InputWrapper=styled.div`
    display: flex;
    align-items: center;
`

const MessageWrapper=styled.p<{textColor:string}>`
    margin-top: 1.1rem;

    color: ${({textColor})=>textColor};

    ${({ theme }) => theme.fonts.message};
`

const IconWrapper=styled.div<{marginLeft:number}>`
    margin: 2rem 0 0 ${({marginLeft})=>marginLeft}rem;
`

const VerificationCodeTextIcon=styled(VerificationCodeTextIc)`
    margin-top: 3.2rem;
`

const ConfirmPasswordTextIcon=styled(ConfirmPasswordTextIc)`
    margin-top: 3.2rem;
`

const SignUpBackArrowIcon=styled(SignUpBackArrowIc)`
    cursor: pointer;
`

const ArrowButtonWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 56rem;
    height: 4.6rem;

    position: absolute;
    left:11rem;
    bottom: 7rem;

    bottom: 7rem;
`

const EyeIcWrapper=styled.div`
    position: absolute;
    
    margin: 1.9rem 0 0 52rem;

    cursor: pointer;;
`