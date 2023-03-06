import { currentUser } from "../../core/constants/userType";

export function checkUserType(userType: string): boolean {
  return userType === currentUser.PRODUCER;
}

export function isVocal(userType: string): boolean{
  return userType===currentUser.VOCAL
}

export function isProducer(userType: string): boolean{
  return userType===currentUser.PRODUCER
}

