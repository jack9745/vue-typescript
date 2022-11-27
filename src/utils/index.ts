import Cookies from 'js-cookie'

// 获取Cookie
const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

// 设置Cookie
const setCookie = (key: string, value: string) => {
  Cookies.set(key, value)
}
export { getCookie, setCookie }
