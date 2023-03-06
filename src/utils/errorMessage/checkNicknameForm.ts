export function checkNicknameForm(nickname:string) {
    const regex = /^[a-zA-z0-9~!@#$%^&*()_+|<>?:{}가-힣]{1,16}$/
    return regex.test(nickname);
}
