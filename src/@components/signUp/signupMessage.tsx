import styled from 'styled-components';
import { SignBgLogoIc, SignWelcomeIc } from '../../assets'
import { StepPropsType } from '../../type/signUpStepTypes'
import { isMessageLogo,isMessageWelcome } from '../../utils/signUp/checkMessageType';

export default function SignupMessage(props:StepPropsType) {
    const {step}=props;

  return (
    <>
    {isMessageLogo(step)&&<SignBgLogoIcon/>}
    {isMessageWelcome(step)&&<SignWelcomeIcon/>}
    </>
  )
}

const SignBgLogoIcon=styled(SignBgLogoIc)`
    margin: 43.5rem 24.9rem 0 23.3rem;
`

const SignWelcomeIcon=styled(SignWelcomeIc)`
    margin: 35.2rem 28.2rem 0 32.7rem;
`