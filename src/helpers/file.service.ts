import * as fs from 'node:fs/promises'
import * as path from 'path'

export class FileService {
  private getFilePath(fileName: string): string {
    return path.join(process.cwd(), 'auth_logs', fileName)
  }

  async createFile(fileName: string): Promise<void> {
    const filePath = this.getFilePath(fileName)

    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true })

      const fileExists = await fs
        .access(filePath)
        .then(() => true)
        .catch(() => false)

      if (!fileExists) {
        await fs.writeFile(filePath, '', { encoding: 'utf-8' })
      }
    } catch (error) {
      throw new Error('Failed to create auth log file.')
    }
  }

  async appendToFile(fileName: string, content: string): Promise<void> {
    const filePath = this.getFilePath(fileName)

    try {
      await fs.appendFile(filePath, content + '\n', { encoding: 'utf-8' })
    } catch (error) {
      throw new Error('Failed to append to auth log file.')
    }
  }
}
