import styled from "styled-components";
import { BackBtnIc } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function SignUpBackButton() {
  const navigate = useNavigate();

  function movePreviousPage() {
    if (window.confirm('회원가입을 종료하겠습니까?'))
    {
        navigate(-1);
    }

  }

  return (
    <ButtonContainer onClick={movePreviousPage}>
      <BackBtnIc />
      <ButtonText>Back</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 11.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const ButtonText = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;
