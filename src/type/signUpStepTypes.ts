export interface UserDataPropsType{
  imageFile:string;
  ID:string;
  PW:string;
  name:string;
}

export interface StepPropsType{
    step:string;
    setStep:React.Dispatch<React.SetStateAction<string>>;  
    setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}

export interface StepUserPropsType{
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userData:UserDataPropsType;
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}

export interface SetStepPropsType {
    setStep:React.Dispatch<React.SetStateAction<string>>;  
}

export interface SetPropsType {
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}


export interface SetUserPropsType {
  setStep:React.Dispatch<React.SetStateAction<string>>;  
  userData:UserDataPropsType;
  setUserData:React.Dispatch<React.SetStateAction<UserDataPropsType>>
}

export interface OnlyStepPropsType {
  step:string;
}

export interface ContinueButtonPropsTypes{
  successNextStep:string;
  step:string;
  setStep:React.Dispatch<React.SetStateAction<string>>;  
}

