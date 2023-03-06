import React, { useEffect, useRef, useState } from 'react'
import { SignUpBackArrowIc, SignUpChangeImageIc, SignUpErrorIc, SignUpUploadImageIc, SignUpVerifyIc, WhatsYourNameTextIc } from '../../assets';
import { SetUserPropsType } from '../../type/signUpStepTypes';
import styled from 'styled-components';
import { setInputUnderline, setMessageColor } from '../../utils/errorMessage/setInputStyle';
import { signUpStep } from '../../core/signUp/signupStepType';
import ContinueButton from './continueButton';
import { nicknameValidMessage } from '../../core/userInfoErrorMessage/nicknameMessage';
import { checkNicknameForm } from '../../utils/errorMessage/checkNicknameForm';
import ConventionCheckBox from './conventionCheckBox';
import { continueType } from '../../core/signUp/continueType';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/main';
import { useMutation, useQueryClient } from 'react-query';
import { joinProducer, joinVocal } from '../../core/api/signUp';
import { isVocal, isProducer } from '../../utils/common/userType';
import { checkImageSize, checkImageType, getFileSize, getFileURL } from '../../utils/uploadPage/uploadImage';
import ProfilImageContainer from './profilImageContainer';

export default function SignupNicknameConvention(props:SetUserPropsType) {
    const {setStep, setUserData, userData}=props;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isHover, setIsHover]=useState<boolean>(false);
    const [nickname, setNickname]=useState<string>("")
    const [nicknameMessage, setNicknameMessage]=useState<string>(nicknameValidMessage.NULL)
    const [completeCheck, setCompleteCheck]=useState<boolean>(false)
    const userType=useRecoilValue(UserType)
    const [successNextStep, setSuccessNextStep]=useState<string>(continueType.FAIL)

    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {     
      const uploadName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
      if (checkImageType(uploadName) && e.target.files) {
        const file = e.target.files[0];
        const fileUrl: string = getFileURL(file);
        const imageSize: number = getFileSize(file);
        if (checkImageSize(imageSize)) {
          setImageSrc(fileUrl);
        }
      }
    }

    function checkImageHover(){
      setIsHover(prev=>!prev)
    }

  function setErrorIcon(message:string){ 
    switch (message) {
        case nicknameValidMessage.ERROR:
            return <SignUpErrorIc/>;
        case nicknameValidMessage.SUCCESS:
            return <SignUpVerifyIc/>; 
        default:
            return ;
      }
  }

  function moveBackToEmailPassword(){
    setUserData((prev) => ({ ...prev, ID: "", PW:"" }));
    setStep(signUpStep.SIGNUP_EMAIL_PASSWORD)
  }

  function completeNicknameConventions(){
    return nicknameMessage===nicknameValidMessage.SUCCESS&&completeCheck
  }

  function writeNickname(e: React.ChangeEvent<HTMLInputElement>){
    if(!e.target.value){
        setNicknameMessage(nicknameValidMessage.NULL)
    }

    else if(!checkNicknameForm(e.target.value)){
      setNicknameMessage(nicknameValidMessage.ERROR)
    }

    else if(checkNicknameForm(e.target.value)){
      setNicknameMessage(nicknameValidMessage.SUCCESS)
    }

    setNickname(e.target.value)
  }

  function saveUserData(){
    setUserData((prev) => ({ ...prev, imageFile:imageSrc, name:nickname }));
  }

  //upload userData
  const queryClient = useQueryClient();
  
  const JoinProducer = useMutation(joinProducer, {
    onSuccess: () => {
    queryClient.invalidateQueries("join-producer");
    completeNicknameConventions()?setSuccessNextStep(continueType.SUCCESS):setSuccessNextStep(continueType.FAIL);
    console.log("성공")
    },
    onError:()=>{

    }
  });

  const JoinVocal = useMutation(joinVocal, {
    onSuccess: () => {
    queryClient.invalidateQueries("join-vocal");
    console.log("성공")
    },
    onError:()=>{
     
    }
  });

  useEffect(() => {
      isVocal(userType)&&JoinVocal.mutate(userData);
      isProducer(userType)&&JoinProducer.mutate(userData);
  }, [userData]);
  //user data post end

  return (
    <>
    {/* <ImageContainer>
      <Label htmlFor='profile-img' onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
        {imageSrc ? (
          <ImgWrapper>
              <Img src={imageSrc} alt="preview-img" />
          </ImgWrapper>
        ):(
          <SignUpUploadImageIcon/>
        )}
        {imageSrc&&isHover&&<SignUpChangeImageIcon/>}
      </Label>
        <input type="file" id="profile-img" style={{ visibility: "hidden" }} onChange={(e) => {uploadImage(e)}} />
    </ImageContainer> */}
    <ProfilImageContainer imageSrc={imageSrc} checkImageHover={checkImageHover} isHover={isHover} uploadImage={uploadImage}/>
    
    <NicknameWrapper>
      <WhatsYourNameTextIc/>
      <InputWrapper>
          <Input type="text" placeholder="Enter your user name" width={56} underline={setInputUnderline(nicknameMessage)} onChange={writeNickname}/>
          {setErrorIcon(nicknameMessage)&&(
              <IconWrapper marginLeft={-3.9}>
                  {setErrorIcon(nicknameMessage)}
              </IconWrapper>
          )}
      </InputWrapper>
      <MessageWrapper textColor={setMessageColor(nicknameMessage)}>
          {nicknameMessage}
      </MessageWrapper>
    </NicknameWrapper>
    <ConventionCheckBox setCompleteCheck={setCompleteCheck}/>
    <ArrowButtonWrapper>
      <SignUpBackArrowIcon onClick={moveBackToEmailPassword}/>
      <div onClick={saveUserData}>
        <ContinueButton successNextStep={successNextStep} step={signUpStep.SIGNUP_PROFILE} setStep={setStep}/>
      </div>
    </ArrowButtonWrapper>
    
    </>
  );

}

const Label=styled.label`
  cursor: pointer;
`

const ImageContainer=styled.section`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: 21.7rem;
  height: 21.7rem;
`

const ImgWrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 21.7rem;
  height: 21.7rem;

  border-radius: 25rem;

  position: absolute;
  overflow: hidden;

`

const Img=styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`

const SignUpChangeImageIcon=styled(SignUpChangeImageIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;
  
  backdrop-filter: blur(1.7rem);
`

const SignUpUploadImageIcon=styled(SignUpUploadImageIc)`
  position: absolute;
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

const NicknameWrapper=styled.section`
    margin: 0rem 11rem;
`