import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./@pages/mainPage";
import ProducerProfilePage from "./@pages/producerProfilePage";
import TrackPostPage from "./@pages/trackPostPage";
import TrackSearchPage from "./@pages/trackSearchPage";
import VocalProfilePage from "./@pages/vocalProfilePage";
import VocalsPage from "./@pages/vocalsPage";
import UploadPage from "./@pages/uploadPage";
import ForgotPasswordPage from "./@pages/forgotPasswordPage";
import ResetPasswordPage from "./@pages/resetPasswordPage";
import SignUpPage from "./@pages/signUpPage";
import LoginPage from "./@pages/loginPage";
import ProfileEditPage from "./@pages/profileEditPage";
import ProducerPortfolioEditPage from "./@pages/producerPortfolioEditPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/track-search" element={<TrackSearchPage />} />
        <Route path="/vocal-search" element={<VocalsPage />} />
        <Route path="/track-post/:beatId" element={<TrackPostPage />} />
        <Route path="/producer-profile/:producerId" element={<ProducerProfilePage />} />
        <Route path="/portfolio-edit/:producerId" element={<ProducerPortfolioEditPage />} />
        <Route path="/vocal-profile/:vocalId" element={<VocalProfilePage />} />
        {/* <Route path="/upload" element={<UploadPage />} /> */}
        <Route path="/upload/:producerUploadType" element={<UploadPage />} />
        <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile-edit/:id" element={<ProfileEditPage />} />
      </Routes>
    </BrowserRouter>
  );
}
