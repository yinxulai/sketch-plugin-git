import { alert } from "../controller/window"

export function handleError(_, __, descriptor: PropertyDescriptor) {
  const self = this
  const rawValue = descriptor.value

  descriptor.value = (...args: any[]) => {
    const resutl = rawValue.apply(self, args)
    if (resutl instanceof Promise) {
      resutl.catch(error => alert('发生错误', JSON.stringify(error)))
    }
    return resutl
  }
}
