import { conventionType } from "../../core/convention/conventionType";
import { PersonalInformationProcessingPolicy } from "../../core/convention/personalInformationProcessingPolicy";
import { MarketingInformationAgreePolicy } from '../../core/convention/marketingInformationAgreePolicy';
import { UsingSitePolicy } from '../../core/convention/usingSitePolicy';


export function checkConventionType(policy: string) {
    switch(policy){
        case conventionType.PERSONAL:
            return PersonalInformationProcessingPolicy;
        case conventionType.MARKETING:
            return MarketingInformationAgreePolicy;
        case conventionType.USINGSITE:
            return UsingSitePolicy;
        default:
            return ;
    }
}
