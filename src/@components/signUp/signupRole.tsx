import { useState } from 'react';
import styled from 'styled-components'
import { SignupNotSelectedProducerIc, SignupNotSelectedVocalIc, SignupSelectedProducerIc, SignupSelectedVocalIc, SignUpSelectRoleTitleIc } from '../../assets'
import { currentUser } from '../../core/constants/userType';
import { signUpStep } from '../../core/signUp/signupStepType';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import ContinueButton from './continueButton';

export default function SignupRole(props:SetStepPropsType) {
    const {setStep}=props;
    const [hoveredRole, setHoveredRole] = useState<string>('')
    const [selectedRole, setSelectedRole] = useState<string>('')

    function hoverRole(role:string){
      setHoveredRole(role)
    }

    function hoverOut(){
      setHoveredRole('')
    }

    function selectRole(role:string){
      setSelectedRole(role)
    }

    function checkHovered(role:string){
      return hoveredRole===role
    }

    function checkSelected(role:string){
      return selectedRole===role
    }

    console.log(hoveredRole)

  return (
    <RoleWrapper>
      <SignUpSelectRoleTitleIcon/>

      {checkHovered(currentUser.PRODUCER)||checkSelected(currentUser.PRODUCER)?<SignupSelectedProducerIcon onClick={()=>selectRole(currentUser.PRODUCER)} onMouseEnter={()=>hoverRole(currentUser.PRODUCER)} onMouseOut={hoverOut}/>:<SignupNotSelectedProducerIcon onMouseEnter={()=>hoverRole(currentUser.PRODUCER)} onMouseOut={hoverOut}/>}
      {checkHovered(currentUser.VOCAL)||checkSelected(currentUser.VOCAL)?<SignupSelectedVocalIcon onClick={()=>selectRole(currentUser.VOCAL)} onMouseEnter={()=>hoverRole(currentUser.VOCAL)} onMouseOut={hoverOut}/>:<SignupNotSelectedVocalIcon onMouseEnter={()=>hoverRole(currentUser.VOCAL)} onMouseOut={hoverOut}/>}    
      <ContinueButton answer={selectedRole} step={signUpStep.SIGNUP_EMAIL} setStep={setStep}/>
    </RoleWrapper>
  )
}

const RoleWrapper=styled.section`
  display: flex;
  flex-direction: column;

  margin-top: 7.7rem;
`

const SignUpSelectRoleTitleIcon=styled(SignUpSelectRoleTitleIc)`
  margin-left:14.4rem;
`

const SignupSelectedProducerIcon=styled(SignupSelectedProducerIc)`
  margin:3.3rem 0 1.4rem 11.2rem;

  cursor: pointer;
`

const SignupNotSelectedProducerIcon=styled(SignupNotSelectedProducerIc)`
  margin:3.3rem 0 1.4rem 11.2rem;

  cursor: pointer;
`

const SignupSelectedVocalIcon=styled(SignupSelectedVocalIc)`
  margin-left: 6.3rem;

  cursor: pointer;
`

const SignupNotSelectedVocalIcon=styled(SignupNotSelectedVocalIc)`
  margin-left: 6.3rem;

  cursor: pointer;
`