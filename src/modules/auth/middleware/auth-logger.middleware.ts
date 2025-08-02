import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { FileService } from 'src/helpers/file.service'
import { safeBody } from 'src/helpers/safeBody'

@Injectable()
export class AuthLogger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const date = new Date().toDateString()
    const fileService = new FileService()

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
    const logFile = `Auth_Log-${date}.txt`
    fileService.createFile(logFile)
    fileService.appendToFile(logFile, JSON.stringify(log))

    next()
  }
}
