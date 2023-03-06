import styled from 'styled-components';
import { SignBgLogoIc, SignUpCompleteButtonIc, SignUpSkipButtonIc, SignWelcomeIc } from '../../assets'
import { StepPropsType } from '../../type/signUpStepTypes'
import { isMessageLogo,isMessageWelcome } from '../../utils/signUp/checkMessageType';

export default function SignupMessage(props:StepPropsType) {
    const {step}=props;

    return (
    <>
    {isMessageLogo(step)&&<SignBgLogoIcon/>}
    {isMessageWelcome(step)&&(
      <WelcomeMessageWrapper>
      <SignUpSkipButtonIcon/>
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