import { atom } from "recoil";
import {recoilPersist} from "recoil-persist";
import { currentUser } from "../core/constants/userType";

// const {persistAtom}=recoilPersist();

export const UserType = atom<string>({
  key: "UserType",
  default: "",
  // effects_UNSTABLE:[persistAtom],
});
