import React from 'react'
import styled from 'styled-components'
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc, SignUpGetStartedButtonIc, SignUpProducerButtonIc, SignUpProducerQIc, SignUpSuccessBackgroundIc, SignUpVocalButtonIc, SignUpVocalQIc } from '../../assets'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/main';
import { currentUser } from '../../core/constants/userType';
import { profileCategory } from '../../core/constants/pageCategory';
import { useState } from 'react';
import { isProducer, isVocal } from '../../utils/common/userType';

export default function SignupSuccess() {
    const userType=useRecoilValue<string>(UserType)
    const [visible, setVisible]=useState<boolean>(false)
    const navigate=useNavigate()

    function moveToHome(){
        navigate('/')
    }

    function moveToVocalUpload(){
        navigate(`/upload/${currentUser.VOCAL}`)
    }

    function openProducerUploadModal(){
        setVisible(true)
    }

    function moveToProducerUpload(page:string){
        navigate(page)
    }

  return (
    <>
        <SignUpSuccessBackgroundIc/>

    <SuccessPageWrapper>
    <SignUpGetStartedButtonIcon onClick={moveToHome}/>

        {isVocal(userType)&&(
            <UploadButtonWrapper>
                <SignUpVocalQIc/>
                <UploadButton>
                    <SignUpVocalButtonIc onClick={moveToVocalUpload}/>
                </UploadButton>
            </UploadButtonWrapper>
        )}
        {isProducer(userType)&&(
            <UploadButtonWrapper>
                <SignUpProducerQIc/>
                <UploadButton>
                    <SignUpProducerButtonIc onClick={openProducerUploadModal}/>
                </UploadButton>
            </UploadButtonWrapper>
        )}
        {visible&&(
        <ModalWrapper>
            <MoveTouploadVocalSearchingButtonIc onClick={()=>moveToProducerUpload(`/upload/${profileCategory.VOCAL_SEARCHING}`)}/>
            <MoveTouploadPortfolioButtonIc onClick={()=>moveToProducerUpload(`/upload/${profileCategory.PORTFOLIO}`)}/>
        </ModalWrapper>
        )}

    </SuccessPageWrapper>
    </>
  )
}

const SuccessPageWrapper=styled.div`
    position: absolute;

    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
`

const SignUpGetStartedButtonIcon=styled(SignUpGetStartedButtonIc)`
    margin-top: 46.7rem;

    cursor: pointer;
`

const UploadButtonWrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 9.7rem;
`

const UploadButton=styled.div`
    margin-top: 2.6rem;
    cursor: pointer;
`

const ModalWrapper=styled.section`
    display: flex;
    flex-direction: column;

    margin: 2.5rem 0 0 13.6rem;

    cursor: pointer;
`