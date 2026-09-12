import { Request, Response } from 'express';
import { CompilerService } from '../services/compiler.service';
import { ValidationError } from '../../../errors';

export class CompilerController {
  private readonly compilerService: CompilerService;

  constructor(compilerService = new CompilerService()) {
    this.compilerService = compilerService;
  }

  public execute = async (req: Request, res: Response): Promise<void> => {
    const { language, code, stdin, cpuTimeLimit, memoryLimitKb } = req.body;

    if (!language || typeof language !== 'string') {
      throw new ValidationError('Field "language" is required.');
    }

    if (code === undefined || code === null || typeof code !== 'string') {
      throw new ValidationError('Field "code" must be a valid string.');
    }

    // Phase 6: Server-side Code Size Safeguards
    if (code.length > 64000) {
      throw new ValidationError('Source code size exceeds maximum allowed length of 64KB.');
    }

    if (stdin && typeof stdin === 'string' && stdin.length > 64000) {
      throw new ValidationError('Stdin size exceeds maximum allowed length of 64KB.');
    }

    try {
      const result = await this.compilerService.executeCode({
        language,
        code,
        stdin: typeof stdin === 'string' ? stdin : '',
        cpuTimeLimit,
        memoryLimitKb,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(503).json({
        success: false,
        error: err.message || 'Code execution service is temporarily unavailable.',
      });
    }
  };
}
export default CompilerController;
