const TOKEN_KEY = 'token'

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY)
}

const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token && token.startsWith('Bearer ')) {
    return token.slice(7) // 去掉 "Bearer " 前缀
  }
  return token
}

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export { clearToken, getToken, isLogin, setToken }
