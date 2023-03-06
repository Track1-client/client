import React from 'react'
import styled from 'styled-components';
import { SignUpModalXIc } from '../../assets';
import { checkConventionType } from '../../utils/convention/checkConventionType';

interface PropsType{
    policy:string
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConventionModal(props:PropsType) {
    const {policy, setShowModal}=props

    function isIntroNotNull(){
        return checkConventionType(policy)?.INTRO!=="";
    }

    function closeModal(){
        setShowModal(false)
    }

  return (
    <ModalBackground>
        <ModalContainer>
            <ModalWrapper>
                <ModalHeader>
                    <SignUpModalXIcon onClick={closeModal}/>
                    <Title>
                        {checkConventionType(policy)?.TITLE}
                    </Title>
                </ModalHeader>
                <Intro intro={isIntroNotNull()}>
                    {checkConventionType(policy)?.INTRO}
                </Intro>
                <Contents intro={isIntroNotNull()}>
                    {checkConventionType(policy)?.CONTENTS.map((content, index)=>(
                        <div>
                            <p dangerouslySetInnerHTML={{ __html: content }}></p>
                            <br/>
                        </div>                    
                    ))}
                </Contents>
            </ModalWrapper>
        </ModalContainer>
    </ModalBackground>
  )
}

const ModalBackground=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    width: 192rem;
    height: 108rem;

    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.5rem);
`

const ModalContainer=styled.div`
    width: 77.7rem;
    height: 88.8rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`
const ModalWrapper=styled.div`
    padding: 6.2rem 5.8rem;
`

const ModalHeader=styled.header`
    display: flex;

    padding-bottom: 5.3rem;
`

const Title=styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 61.5rem;
    height: 4rem;

    ${({theme})=>theme.fonts.typography_title}
    color: ${({theme})=>theme.colors.white};
`

const Intro=styled.p<{intro:boolean}>`
    padding-bottom: ${({intro})=>intro?2.4:0}rem;
    border-bottom: 0.1rem solid ${({theme, intro})=>intro?theme.colors.gray3:"transparent"};

    ${({theme})=>theme.fonts.typography_intro}
    color: ${({theme})=>theme.colors.white};
`

const Contents=styled.p<{intro:boolean}>`
    height: ${({intro})=>intro?55.5:67}rem;
    overflow: scroll;

    padding-top: 2.4rem;
    white-space:pre-wrap;

    ${({theme})=>theme.fonts.typography_content}
    color: ${({theme})=>theme.colors.gray2};
`

const SignUpModalXIcon=styled(SignUpModalXIc)`
    cursor: pointer;
`