import { emailInvalidMessage } from "../../core/userInfoErrorMessage/emailInvalidMessage";
import { passwordInvalidMessage } from "../../core/userInfoErrorMessage/passwordInvalidMessage";
import { verificationCodeInvalidMessage } from "../../core/userInfoErrorMessage/verificationCodeInvalidMessage";

export function setInputUnderline(message:string){ 
    switch (message) {
        case emailInvalidMessage.NULL:
          return "#535559"
        case emailInvalidMessage.FORM:
            return "#FF4F4F";
        case emailInvalidMessage.DUPLICATION:
          return "#FF4F4F";
        case emailInvalidMessage.SUCCESS:
            return "white"  
        case emailInvalidMessage.VERIFY:
            return "#5200FF";
        case verificationCodeInvalidMessage.NULL:
            return "#535559"      
        case verificationCodeInvalidMessage.ERROR:
            return "#FF4F4F";    
        case passwordInvalidMessage.NULL:
            return "#535559"      
        case passwordInvalidMessage.FORM:
            return "#FF4F4F";    
        case passwordInvalidMessage.MATCH:
            return "#FF4F4F";   
        case passwordInvalidMessage.SUCCESS:
            return "#5200FF";    
        default:
            return "white";
        }
}

export function setMessageColor(message:string){ 
    switch (message) {
        case emailInvalidMessage.NULL:
          return "transparent"
        case emailInvalidMessage.FORM:
            return "#FF4F4F";
            case emailInvalidMessage.DUPLICATION:
          return "#FF4F4F";
        case emailInvalidMessage.TIME:
            return "#5200FF";
        case verificationCodeInvalidMessage.ERROR:
            return "#FF4F4F";
        case passwordInvalidMessage.FORM:
            return "#FF4F4F";      
        case passwordInvalidMessage.MATCH:
            return "#FF4F4F";    
        default:
            return "transparent"
        }
}

// export function setErrorIcon(message:string){ 
//     switch (message) {
//         case emailInvalidMessage.FORM:
//             return typeof SignUpVerifyIc;
//         case emailInvalidMessage.DUPLICATION:
//             return typeof SignUpVerifyIc;
//         case emailInvalidMessage.VERIFY:
//             return typeof SignUpVerifyIc;
//         default:
//             return ;
//     }
// }