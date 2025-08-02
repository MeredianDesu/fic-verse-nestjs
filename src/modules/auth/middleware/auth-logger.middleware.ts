import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { FileService } from 'src/helpers/file.service'
import { safeBody } from 'src/helpers/safeBody'

@Injectable()
export class AuthLogger implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const date = new Date().toDateString()

    const fileDir = 'auth_logs'
    const logFile = `Auth_Log-${date}.jsonl`
    const fileService = new FileService(logFile, fileDir)

    const log = {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
      method: req.method,
      originalUrl: req.url,
      body: safeBody(req.body),
      query: req.query,
      userAgent: req.headers['user-agent'],
    }

    await fileService.createFile()
    await fileService.appendToFile(JSON.stringify(log))

    next()
  }
}
