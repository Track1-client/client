import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { SignBgLogoIc, SignUpCompleteButtonIc, SignUpSkipButtonIc, SignWelcomeIc } from '../../assets'
import { patchProfile } from '../../core/api/profile';
import { signUpStep } from '../../core/signUp/signupStepType';
import { SignupMessagePropsType } from '../../type/signUpStepTypes'
import { setCookie } from '../../utils/cookie';
import { isMessageLogo,isMessageWelcome } from '../../utils/signUp/checkMessageType';
import { useSetRecoilState } from 'recoil';
import { useState } from 'react';

export default function SignupMessage(props:SignupMessagePropsType) {
    const {step, setStep, userProfile, setUserProfile}=props;
    const [isComplete, setIsComplete]=useState<boolean>();

    function moveToSuccess(){
      setStep(signUpStep.SIGNUP_SUCCESS)
    }

    const queryClient = useQueryClient();

    const {mutate} = useMutation(patchProfile, {
      onSuccess: (data) => {
      queryClient.invalidateQueries("userProfile");
      },
      onError:()=>{
       
      }
    });
  
  function submit(){
    mutate(userProfile);
  }
  
    useEffect(() => {
      if(!userProfile){
        setIsComplete(true);
      }
    }, [userProfile]);

    return (
    <>
    {isMessageLogo(step)&&<SignBgLogoIcon/>}
    {isMessageWelcome(step)&&(
      <WelcomeMessageWrapper>
      <SignUpSkipButtonIcon onClick={moveToSuccess}/>
      <SignWelcomeIcon/>
      <SignUpCompleteButtonIcon/>
      </WelcomeMessageWrapper>
    )}
    </>
  )
}

const SignBgLogoIcon=styled(SignBgLogoIc)`
    margin: 43.5rem 24.9rem 0 23.3rem;
`

const SignWelcomeIcon=styled(SignWelcomeIc)`
    margin: 1.2rem 28.2rem 0 32.7rem;
`

const WelcomeMessageWrapper=styled.section`
  display: flex;
  flex-direction: column;
`

const SignUpCompleteButtonIcon=styled(SignUpCompleteButtonIc)`
  margin: 4rem 0 0 32rem;

  cursor: pointer;
`

const SignUpSkipButtonIcon=styled(SignUpSkipButtonIc)`
  margin: 27.5rem 0 0 47.7rem;

  cursor: pointer;
`