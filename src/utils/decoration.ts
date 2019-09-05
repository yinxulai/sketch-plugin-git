import { alert } from "../controller/window"

export function handleCatch(_: any, __: string, descriptor: PropertyDescriptor) {
  const rawMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    const resutl = rawMethod.apply(this, args)
    if (resutl instanceof Promise) {
      resutl.catch(error => {
        if (error){
          alert('发生错误', JSON.stringify(error))
        }
        alert('未知错误', "发生未知错误。")
      })
    }
    return resutl
  }
}
