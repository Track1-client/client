import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailInvalidMessage";
import { passwordInvalidMessage } from "../../core/userInfoErrorMessage/passwordInvalidMessage";
import { verificationCodeInvalidMessage } from "../../core/userInfoErrorMessage/verificationCodeInvalidMessage";
import { nicknameValidMessage } from '../../core/userInfoErrorMessage/nicknameMessage';
import { color } from "../../core/userInfoErrorMessage/color";

export function setInputUnderline(message:string){ 
    switch (message) {
        case emailInvalidMessage.NULL:
          return color.GRAY
        case emailInvalidMessage.FORM:
            return color.RED;
        case emailInvalidMessage.DUPLICATION:
          return color.RED;
        case emailInvalidMessage.SUCCESS:
            return color.WHITE  
        case emailInvalidMessage.VERIFY:
            return color.VIOLET;
        case verificationCodeInvalidMessage.NULL:
            return color.GRAY      
        case verificationCodeInvalidMessage.ERROR:
            return color.RED;    
        case passwordInvalidMessage.NULL:
            return color.GRAY      
        case passwordInvalidMessage.FORM:
            return color.RED;    
        case passwordInvalidMessage.MATCH:
            return color.RED;   
        case passwordInvalidMessage.SUCCESS:
            return color.VIOLET;   
        case nicknameValidMessage.NULL:
            return color.GRAY;   
        case nicknameValidMessage.ERROR:
            return color.RED;   
        case nicknameValidMessage.SUCCESS:
            return color.VIOLET;   
        default:
            return color.WHITE;
        }
}

export function setMessageColor(message:string){ 
    switch (message) {
        case emailInvalidMessage.NULL:
          return color.TRANSPARENT
        case emailInvalidMessage.FORM:
            return color.RED;
            case emailInvalidMessage.DUPLICATION:
          return color.RED;
        case emailInvalidMessage.TIME:
            return color.VIOLET;
        case verificationCodeInvalidMessage.ERROR:
            return color.RED;
        case passwordInvalidMessage.FORM:
            return color.RED;      
        case passwordInvalidMessage.MATCH:
            return color.RED;    
        case nicknameValidMessage.NULL:
            return color.TRANSPARENT;   
        case nicknameValidMessage.ERROR:
            return color.RED;   
        case nicknameValidMessage.SUCCESS:
            return color.TRANSPARENT;   
        default:
            return color.TRANSPARENT
        }
}
