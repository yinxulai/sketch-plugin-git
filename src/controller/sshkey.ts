// 管理本地的 ssh key
import { runBashShell } from "./window"

export async function getSSHKey(): Promise<string> {
  const [status, output] = await runBashShell(`cat ~/.ssh/id_rsa.pub`)
  if (status !== 0) {
    console.error('getSSHKeys throw error')
    throw output
  }
  return output
}

export async function createSSHKey(): Promise<string> {
  const [status, output] = await runBashShell(`ssh-keygen -t rsa`)
  if (status !== 0) {
    console.error('createSSHKey throw error')
    throw output
  }
  return getSSHKey()
}
