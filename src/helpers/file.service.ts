import * as fs from 'node:fs/promises'
import * as path from 'path'

export class FileService {
  private fileName: string
  private fileDir: string
  private mainDir: string = 'logs'

  constructor(fileName: string, fileDir: string) {
    this.fileName = fileName
    this.fileDir = fileDir
  }
  private getFilePath(): string {
    return path.join(process.cwd(), this.mainDir, this.fileDir, this.fileName)
  }

  async createFile(): Promise<void> {
    const filePath = this.getFilePath()

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

  async appendToFile(content: string): Promise<void> {
    const filePath = this.getFilePath()

    try {
      await fs.appendFile(filePath, content + '\n', { encoding: 'utf-8' })
    } catch (error) {
      throw new Error('Failed to append to auth log file.')
    }
  }
}
