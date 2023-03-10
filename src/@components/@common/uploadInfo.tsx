import React from "react";
import styled, { css } from "styled-components";
import { useState, useRef, useEffect } from "react";
import {
  UploadFileUpdateIc,
  UploadCategoryIc,
  UploadHashtagIc,
  UploadDescriptionIc,
  FolderUploadIc,
  CategoryDropDownIc,
  AddHashtagIc,
  HashtagWarningIc,
  HoverHashtagWarningIc,
  DeleteHashtagIc,
  CheckCategoryIc,
} from "../../assets";

import { Categories } from "../../core/constants/categories";
import { checkMaxInputLength } from "../../utils/uploadPage/maxLength";
import { isEnterKey, isMouseEnter, isFocus } from "../../utils/common/eventType";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";
import useHover from "../../utils/hooks/useHover";

interface propsType {
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
  setUploadDataRef: React.Dispatch<React.SetStateAction<React.MutableRefObject<HTMLTextAreaElement | null> | null>>;
}

export default function UploadInfo(props: propsType) {
  const { uploadData, setUploadData, setUploadDataRef } = props;
  const HASHTAG_WIDTH: number = 8.827;

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const introduceRef = useRef<HTMLTextAreaElement | null>(null);

  const enteredHashtag = useRef<HTMLInputElement | null>(null);
  const categoryRefs = useRef<HTMLLIElement[] | null[]>([]);

  const [checkState, setCheckState] = useState<boolean[]>([]);
  const [checkHoverState, setCheckHoverState] = useState<boolean[]>([]);
  const [checkStateIcon, setCheckStateIcon] = useState<boolean[]>([]);

  const [hiddenDropBox, setHiddenDropBox] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  const [isTextOverflow, setIsTextOverflow] = useState<boolean>(false);
  const [categoryState, setCategoryState] = useState<boolean>(false);
  const [audioType, setAudioType] = useState<string>("");

  const [descriptionHoverState, setDescriptionHoverState] = useState<boolean>(false);
  const [titleHoverState, setTitleHoverState] = useState<boolean>(false);
  const [textareaHeight, setTextareaHeight] = useState<String>("33");
  const [textareaMargin, setTextareaMargin] = useState<number>(33.8);
  const [hashtagInputWidth, setHashtagInputWidth] = useState<number>(HASHTAG_WIDTH);
  const [hashtagLength, setHashtagLength] = useState<number>(0);

  const [titleLength, setTitleLength] = useState<number>(0);
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  // const [warningHoverState, setWarningHoverState] = useState<boolean>(false);
  const { hoverState, changeHoverState } = useHover();

  useEffect(() => {
    if (introduceRef && introduceRef.current) {
      introduceRef.current.style.height = 0 + "rem";
      const scrollHeight = introduceRef.current.scrollHeight;
      changeIntroduceInputHeight(scrollHeight);
      setTextareaMargin(scrollHeight);
    }
  }, [textareaHeight]);

  useEffect(() => {
    if (checkMaxInputLength(uploadData.keyword.length, 1) && !isEmptyHashtagInput()) {
      makeZeroInputWidth(0);
      const inputWidth = enteredHashtag.current!.scrollWidth;
      changeHashtagInputWidth(inputWidth);
      setHashtagInputWidth(inputWidth);
    } else {
      makeZeroInputWidth(HASHTAG_WIDTH);
      setHashtagInputWidth(HASHTAG_WIDTH);
    }
  }, [hashtagInputWidth]);

  useEffect(() => {
    setUploadDataRef(introduceRef);
    const initArray = getInitFalseArray();
    initArrayState(initArray);
  }, []);

  function getInitFalseArray(): boolean[] {
    const initArray: boolean[] = [];
    Object.values(Categories).forEach(() => {
      initArray.push(false);
    });
    return initArray;
  }

  function initArrayState(initArray: boolean[]): void {
    setCheckState(initArray);
    setCheckHoverState(initArray);
    setCheckStateIcon(initArray);
  }

  //?????????
  function changeTitleText(e: React.ChangeEvent<HTMLInputElement>) {
    const inputLength = e.target.value.length;
    if (checkMaxInputLength(inputLength, 36)) {
      setTitleLength(inputLength);
      setUploadData((prevState) => {
        return { ...prevState, title: e.target.value };
      });
    } else {
      restrictInput(titleRef);
    }
  }

  function hoverTitle(e: React.FocusEvent<HTMLInputElement>) {
    if (isFocus(e)) {
      setTitleHoverState(true);
    } else {
      isTitleEmpty() ? setTitleHoverState(false) : setTitleHoverState(true);
    }
  }

  function isTitleEmpty(): boolean {
    return titleRef.current!.value.length === 0;
  }

  function showDropBox(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    setHiddenDropBox((prev) => !prev);
  }

  //????????? ?????????
  function uploadAudiofile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files !== null) {
      const file = e.target.value;
      const audioFile = e.target!.files[0];
      const audioFileName: string = getAudioFileName(file);
      const audioFileType: string = getAudioFileType(file, audioFileName.length);
      const onlyFileName: string = getOnlyFileName(file);

      if (checkAduioFileType(audioFileType)) {
        setAudioAttribute(audioFileName, audioFileType, onlyFileName);
        setUploadData((prevState) => {
          return { ...prevState, wavFile: audioFile };
        });
      } else {
        alert("???????????? ????????? ?????????!");
      }
    }
  }

  function checkAduioFileType(type: string) {
    return type === ".mp3" || type === ".wav";
  }

  function getAudioFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1);
  }

  function getAudioFileType(file: string, fileLength: number): string {
    return file.substring(file.lastIndexOf("\\") + 1).substring(fileLength - 4);
  }

  function getOnlyFileName(file: string): string {
    return file.substring(file.lastIndexOf("\\") + 1, file.length - 4);
  }

  function setAudioAttribute(name: string, type: string, editName: string) {
    if (checkMaxInputLength(editName.length, 13)) {
      setIsTextOverflow(false);
      setFileName(name);
    } else {
      setIsTextOverflow(true);
      setFileName(editName);
    }
    setAudioType(type);
  }

  // ????????????
  function selectedCategory(e: React.MouseEvent<HTMLLIElement>, index: number) {
    const temp = getInitFalseArray();

    temp[index] = true;
    setCheckState([...temp]);
    setCheckStateIcon([...temp]);
    setCategoryState(true);
    setHiddenDropBox(true);
    setUploadData((prevState) => {
      return { ...prevState, category: e.currentTarget.innerText };
    });
  }

  function hoverCategoryMenu(e: React.MouseEvent<HTMLLIElement>, index: number) {
    const hoverMenu = getInitFalseArray();

    if (isMouseEnter(e)) {
      hoverMenu[index] = true;
      setCheckHoverState([...hoverMenu]);
    } else {
      setCheckHoverState([...hoverMenu]);
    }
  }

  //????????????
  function appendHashtag(): void {
    const hashtag = getEnteredHashtag();
    if (!isDuplicateHashtag(hashtag)) {
      setUploadData((prevState) => {
        return { ...prevState, keyword: [...uploadData.keyword, hashtag] };
      });
      resetHashtagInputWidth();
      resetHashtagCurrentValue();
    }
  }

  function resetHashtagInputWidth(): void {
    setHashtagInputWidth(HASHTAG_WIDTH);
  }

  function resetHashtagCurrentValue(): void {
    enteredHashtag.current!.value = "";
  }

  function getEnteredHashtag(): string {
    return enteredHashtag.current!.value;
  }

  function isDuplicateHashtag(value: string): boolean {
    const isDuplicate = uploadData.keyword.includes(value);
    isDuplicate && alert("????????? ???????????? ?????????!");
    return isDuplicate;
  }

  function addHashtag(): void {
    isMaxHashtags() && appendHashtag();
  }

  function isMaxHashtags(): boolean {
    return uploadData.keyword.length < 3;
  }

  function addHashtagEnterKey(e: React.KeyboardEvent<HTMLInputElement>): void {
    isEnterKey(e) && addHashtag();
  }

  function restrictInput(ref: any): void {
    ref.current!.value = ref.current!.value.slice(0, -1);
  }

  function changeHashtagTextWidth(e: React.ChangeEvent<HTMLInputElement>) {
    const inputLength = e.target.value.length;

    if (checkMaxInputLength(inputLength, 10)) {
      setHashtagLength(inputLength);
      setHashtagInputWidth(Number(e.target.value));
    } else {
      restrictInput(enteredHashtag);
    }
  }

  function deleteHashtag(index: number) {
    const deleteTag = uploadData.keyword;
    deleteTag.splice(index, 1);

    setUploadData((prevState) => {
      return { ...prevState, keyword: deleteTag };
    });
    resetHashtagInputWidth();
  }

  // function hoverWarningState(e: React.MouseEvent<HTMLInputElement>) {
  //   isMouseEnter(e) ? setWarningHoverState(true) : setWarningHoverState(false);
  // }

  function isEmptyHashtagInput(): boolean {
    return enteredHashtag.current!.value.length === 0;
  }

  function changeHashtagInputWidth(inputWidth: number): void {
    enteredHashtag!.current!.style.width = inputWidth / 10 + "rem";
  }

  function makeZeroInputWidth(width: number): void {
    enteredHashtag!.current!.style.width = width + "rem";
  }

  //?????????
  function resizeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = e.target.value.split("\n").length;
    const inputLength = e.target.value.length;
    const currentHeight = introduceRef.current!.scrollHeight;

    if (
      checkMaxInputLength(enterCount, 7) &&
      checkMaxInputLength(currentHeight, 200) &&
      checkMaxInputLength(inputLength, 250)
    ) {
      setTextareaHeight(e.target.value);
      setDescriptionLength(inputLength);
    } else {
      restrictInput(introduceRef);
    }
  }

  function hoverDescription(e: React.FocusEvent<HTMLTextAreaElement>) {
    const inputLength = e.target.value.length;

    if (isFocus(e)) {
      setDescriptionHoverState(true);
    } else {
      inputLength === 0 ? setDescriptionHoverState(false) : setDescriptionHoverState(true);
    }
  }

  function changeIntroduceInputHeight(scrollHeight: number): void {
    introduceRef.current!.style.height = scrollHeight / 10 + "rem";
  }

  return (
    <Container>
      <TitleInput
        typeof="text"
        placeholder="Please enter a title"
        spellCheck={false}
        maxLength={36}
        onChange={changeTitleText}
        onFocus={hoverTitle}
        onBlur={hoverTitle}
        ref={titleRef}></TitleInput>
      <Line titleLength={titleLength} titleHoverState={titleHoverState} />

      <TextCount font={"body"} textareaMargin={textareaMargin}>
        <TextWrapper>
          <InputCount>{titleLength}</InputCount>
          <LimitCount>/36</LimitCount>
        </TextWrapper>
      </TextCount>

      <InfoContainer>
        <InfoItemBox>
          <NameBox>
            <UploadFileUpdateIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputFileTextWrapper fileName={fileName}>
                <FileName value={fileName} isTextOverflow={isTextOverflow} disabled />
                {isTextOverflow && <FileAttribute isTextOverflow={isTextOverflow}>{audioType}</FileAttribute>}
                <input
                  type="file"
                  id="wavFileUpload"
                  style={{ display: "none" }}
                  accept=".wav,.mp3"
                  onChange={uploadAudiofile}
                  readOnly
                />
              </InputFileTextWrapper>
              <label htmlFor="wavFileUpload" style={{ cursor: "pointer" }}>
                <FolderUploadIcon />
              </label>
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadCategoryIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              <InputCategoryTextWrapper categoryState={categoryState}>
                <InputCategoryText categoryState={categoryState} onClick={showDropBox} ref={categoryRef}>
                  {uploadData.category}
                </InputCategoryText>
              </InputCategoryTextWrapper>
              <CategoryDropDownIcon onClick={showDropBox} />
            </InputWrapper>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadHashtagIc />
          </NameBox>
          <InputBox>
            <InputWrapper>
              {uploadData.keyword.length > 0 ? (
                <>
                  {uploadData.keyword.map((item: string, index: number) => {
                    return (
                      <InputHashtagWrapper>
                        <Hashtag key={index}>
                          <HashtagWrapper>
                            <HashtagSharp>{`# ${item}`}</HashtagSharp>
                            <DeleteHashtagIcon onClick={() => deleteHashtag(index)} />
                          </HashtagWrapper>
                        </Hashtag>
                      </InputHashtagWrapper>
                    );
                  })}
                  {isMaxHashtags() && (
                    <InputHashtagWrapper>
                      <Hashtag>
                        <HashtagWrapper>
                          <HashtagSharp># </HashtagSharp>
                          <HashtagInput
                            placeholder="Hashtag"
                            type="text"
                            defaultValue=""
                            onKeyDown={addHashtagEnterKey}
                            onChange={changeHashtagTextWidth}
                            hashtagInputWidth={hashtagInputWidth}
                            maxLength={10}
                            ref={enteredHashtag}
                          />

                          <div style={{ width: "1" }}></div>
                        </HashtagWrapper>
                      </Hashtag>
                    </InputHashtagWrapper>
                  )}
                </>
              ) : (
                <InputHashtagWrapper>
                  <Hashtag>
                    <HashtagWrapper>
                      <HashtagSharp># </HashtagSharp>
                      <HashtagInput
                        placeholder="Hashtag"
                        type="text"
                        defaultValue=""
                        onKeyDown={addHashtagEnterKey}
                        onChange={changeHashtagTextWidth}
                        hashtagInputWidth={hashtagInputWidth}
                        maxLength={10}
                        ref={enteredHashtag}
                      />
                    </HashtagWrapper>
                  </Hashtag>
                </InputHashtagWrapper>
              )}
              {hashtagLength > 0 && uploadData.keyword.length < 2 && <AddHashtagIcon onClick={addHashtag} />}
            </InputWrapper>

            <WarningIcon onMouseEnter={(e) => changeHoverState(e)} onMouseLeave={(e) => changeHoverState(e)}>
              {hoverState ? (
                <>
                  <HoverHashtagWarningIc />
                  <WarningTextWrapper>
                    <WarningText>
                      1. ??????????????? ?????? 3????????? ?????? ???????????????.
                      <br />
                      2. ?????? 10????????? ????????? ???????????????.
                      <br />
                      3. ????????? ???????????? ?????? ??????????????????. (ex. tropical, dynamic)
                    </WarningText>
                  </WarningTextWrapper>
                </>
              ) : (
                <HashtagWarningIc />
              )}
            </WarningIcon>
          </InputBox>
        </InfoItemBox>

        <InfoItemBox>
          <NameBox>
            <UploadDescriptionIc />
          </NameBox>
          <InputBox>
            <InputDescriptionText
              typeof="text"
              placeholder="?????? ????????? ?????? ?????? ??? ????????? ????????? ????????? ??????????????????."
              spellCheck={false}
              maxLength={250}
              onFocus={hoverDescription}
              onBlur={hoverDescription}
              descriptionHoverState={descriptionHoverState}
              ref={introduceRef}
              onChange={resizeTextarea}></InputDescriptionText>
          </InputBox>
        </InfoItemBox>
      </InfoContainer>
      <TextCount font={"description"} textareaMargin={textareaMargin}>
        <TextWrapper>
          <InputCount>{descriptionLength}</InputCount>
          <LimitCount>/250</LimitCount>
        </TextWrapper>
      </TextCount>
      <DropMenuBox hiddenDropBox={hiddenDropBox}>
        <DropMenuWrapper>
          {Object.values(Categories).map((text: string, index: number) => (
            <DropMenuItem
              checkState={checkState[index]}
              checkHoverState={checkHoverState[index]}
              onMouseEnter={(e) => hoverCategoryMenu(e, index)}
              onMouseLeave={(e) => hoverCategoryMenu(e, index)}
              onClick={(e) => selectedCategory(e, index)}
              ref={(element) => {
                categoryRefs.current[index] = element;
              }}>
              <DropMenuText>{text}</DropMenuText>
              {checkStateIcon[index] && <CheckCategoryIc />}
            </DropMenuItem>
          ))}
        </DropMenuWrapper>
      </DropMenuBox>
    </Container>
  );
}

const Container = styled.section`
  height: 74.7rem;
  width: 88.7rem;
`;

const TitleInput = styled.input`
  height: 6.5rem;
  width: 100%;

  font-size: 5rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 13.6rem;
`;

const Line = styled.hr<{ titleLength: number; titleHoverState: boolean }>`
  width: 88.2rem;

  border: 1px solid
    ${(props) =>
      props.titleLength !== 0 || props.titleHoverState
        ? ({ theme }) => theme.colors.white
        : ({ theme }) => theme.colors.gray5};
  margin-left: 5px;
`;

const TextCount = styled.div<{ font: string; textareaMargin: number }>`
  height: 2.3rem;
  width: 100%;

  ${(props) => {
    if (props.font === "body")
      return css`
        ${({ theme }) => theme.fonts.body1};
        margin-top: 1.8rem;
      `;
    else
      return css`
        ${({ theme }) => theme.fonts.description};
        margin-top: ${props.textareaMargin / 10 - 3.3 + 0.8}rem;
      `;
  }}
`;

const TextWrapper = styled.div`
  display: flex;
  float: right;
`;

const InputCount = styled.p`
  color: ${({ theme }) => theme.colors.white};
`;

const LimitCount = styled.p`
  color: ${({ theme }) => theme.colors.gray4};
`;

const InfoContainer = styled.div`
  width: 88.7rem;

  margin-top: 3.9rem;
`;

const InfoItemBox = styled.div`
  height: 6rem;
  width: 100%;

  display: flex;
  margin-bottom: 0.2rem;
`;

const NameBox = styled.div`
  width: 20.7rem;
  height: 100%;

  display: flex;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const FileName = styled.input<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "16.4rem" : "100%")};

  display: flex;
  align-items: center;

  text-overflow: ${(props) => (props.isTextOverflow ? "ellipsis" : "default")};

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
  cursor: default;
`;

const FileAttribute = styled.div<{ isTextOverflow: boolean }>`
  height: 2.5rem;
  width: ${(props) => (props.isTextOverflow ? "100%" : 0)};
  width: 100%;

  display: flex;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.686rem;
`;

const InputFileTextWrapper = styled.div<{ fileName: string }>`
  height: 4.7rem;
  width: 20.8rem;

  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${(props) => (props.fileName !== "" ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryTextWrapper = styled.div<{ categoryState: boolean }>`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 1px solid
    ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryText = styled.div<{ categoryState: boolean }>`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  margin-top: 1.5rem;
  cursor: pointer;
`;

const InputHashtagWrapper = styled.div`
  display: flex;
  margin-top: 1.4rem;
`;

const Hashtag = styled.div`
  height: 3.8rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  border-radius: 2.1rem;
  margin-right: 1rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.9rem 1.5rem;
`;

const HashtagSharp = styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`;

const HashtagInput = styled.input<{ hashtagInputWidth: number }>`
  width: ${(props) => props.hashtagInputWidth}rem;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const InputDescriptionText = styled.textarea<{ descriptionHoverState: boolean }>`
  width: 72rem;
  height: 4rem;

  outline: 0;
  resize: none;
  background-color: transparent;

  border: none;
  border-bottom: 0.1rem solid
    ${(props) => (props.descriptionHoverState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 1.7rem;
  padding-bottom: 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const WarningTextWrapper = styled.div`
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  top: 61.2rem;
  left: 128.4rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 5px;
`;

const WarningText = styled.div`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin: 1.9rem 1.8rem 0.4rem 2.9rem;
`;

const DropMenuBox = styled.div<{ hiddenDropBox: boolean }>`
  display: ${(props) => (props.hiddenDropBox ? "none" : "default")};
  width: 13rem;

  position: absolute;
  top: 54.4rem;
  left: 103.7rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(6.5px);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li<{ checkState: boolean; checkHoverState: boolean }>`
  height: 3.2rem;
  width: 9.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) =>
    props.checkState || props.checkHoverState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3};
  margin: 0 1.9rem;
  cursor: pointer;
`;

const DropMenuText = styled.p`
  height: 2rem;
`;

const WarningIcon = styled.div`
  height: 3rem;
  margin-top: 0.7rem;
  border-radius: 5rem;

  cursor: pointer;
`;

const FolderUploadIcon = styled(FolderUploadIc)`
  margin-left: 1.2rem;
  margin-top: 1.3rem;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  margin-top: 0.9rem;
  cursor: pointer;
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  margin-left: -0.2rem;
  margin-top: 1.3rem;

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  margin-left: 1rem;
  cursor: pointer;
`;
