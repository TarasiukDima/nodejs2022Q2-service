import { Injectable, ConsoleLogger } from '@nestjs/common';
import { join } from 'path';
import { appendFileSync, mkdirSync, statSync, writeFileSync } from 'fs';
import {
  BYTES_IN_KB,
  LOGGING_VARIANTS_ARRAY,
  MAX_FILE_SIZE_KB,
} from '../../settings/index';
import {
  ERROR_CREATE_DIRECTORY,
  ERROR_CREATE_FILE,
  ERROR_WRITE_FILE,
} from '../../settings/messages';
import { LOGGING_FILES, LOGGING_VARIANTS } from '../../types/index';

@Injectable()
export class LoggingService extends ConsoleLogger {
  fileLogNumber: number;
  fileErrorNumber: number;

  constructor(
    private readonly maxFileSize = MAX_FILE_SIZE_KB * BYTES_IN_KB,
    private readonly logLevels = LOGGING_VARIANTS_ARRAY,
    private readonly filesLogDirectory = join(
      __dirname,
      '..',
      '..',
      '..',
      LOGGING_FILES.directory,
    ),
  ) {
    super(LoggingService.name, {
      logLevels: LOGGING_VARIANTS_ARRAY,
    });

    this.fileLogNumber = 1;
    this.fileErrorNumber = 1;
    this.checkFiles();
  }

  private getLogFilePath = (): string => {
    return join(
      this.filesLogDirectory,
      `${LOGGING_FILES.log}-${this.fileLogNumber}${LOGGING_FILES.extension}`,
    );
  };

  private getErrorFilePath = (): string => {
    return join(
      this.filesLogDirectory,
      `${LOGGING_FILES.error}-${this.fileErrorNumber}${LOGGING_FILES.extension}`,
    );
  };

  private checkExistFileOrFolder = (path: string): boolean => {
    try {
      statSync(path);
      return true;
    } catch (error) {
      return false;
    }
  };

  private createDirectoryForFiles = (): void => {
    const existFolder = this.checkExistFileOrFolder(this.filesLogDirectory);

    if (existFolder) return;

    try {
      mkdirSync(this.filesLogDirectory, { recursive: true });
    } catch (error) {
      throw new Error(ERROR_CREATE_DIRECTORY);
    }
  };

  private createFileForLogs = (filePath: string): void => {
    const existFile = this.checkExistFileOrFolder(filePath);

    if (existFile) return;

    try {
      writeFileSync(filePath, '', {
        encoding: 'utf8',
        flag: 'w',
      });
    } catch (error) {
      throw Error(ERROR_CREATE_FILE);
    }
  };

  private checkCurrentNumberFile = (variantLog = LOGGING_FILES.log): void => {
    const filePath =
      variantLog === LOGGING_FILES.log
        ? this.getLogFilePath()
        : this.getErrorFilePath();

    const fileExist = this.checkExistFileOrFolder(filePath);

    if (!fileExist) {
      return this.createFileForLogs(filePath);
    }

    try {
      const statSyncs = statSync(filePath);

      if (statSyncs.size < this.maxFileSize) return;

      variantLog === LOGGING_FILES.log
        ? this.fileLogNumber++
        : this.fileErrorNumber++;

      this.checkCurrentNumberFile(variantLog);
    } catch (error) {
      return null;
    }
  };

  private checkFiles = (): void => {
    this.createDirectoryForFiles();
    this.checkCurrentNumberFile(LOGGING_FILES.log);
    this.checkCurrentNumberFile(LOGGING_FILES.error);
  };

  private checkFileSize = (variantLog: LOGGING_FILES): void => {
    let filePath =
      variantLog === LOGGING_FILES.log
        ? this.getLogFilePath()
        : this.getErrorFilePath();

    try {
      const statSyncs = statSync(filePath);

      if (statSyncs.size < this.maxFileSize) return;

      if (variantLog === LOGGING_FILES.log) {
        this.fileLogNumber++;
        filePath = this.getLogFilePath();
      } else {
        this.fileErrorNumber++;
        filePath = this.getErrorFilePath();
      }

      this.createFileForLogs(filePath);
    } catch (error) {
      return null;
    }
  };

  private writeToFile = (message: string, variantLog = LOGGING_FILES.log) => {
    try {
      this.checkFileSize(variantLog);

      const filePath =
        variantLog === LOGGING_FILES.log
          ? this.getLogFilePath()
          : this.getErrorFilePath();
      appendFileSync(filePath, message, 'utf8');
    } catch (error) {
      console.log(ERROR_WRITE_FILE);
      this.checkFiles();
    }
  };

  log = (message: any, ...optionalParams: Array<any>) => {
    if (!this.logLevels.includes(LOGGING_VARIANTS.log)) return;

    this.writeToFile(message);
    super.log(message, optionalParams);
  };

  error = (message: any, ...optionalParams: Array<any>) => {
    if (!this.logLevels.includes(LOGGING_VARIANTS.error)) return;

    this.writeToFile(message, LOGGING_FILES.error);
    super.error(message, optionalParams);
  };

  warn = (message: any, ...optionalParams: Array<any>) => {
    if (!this.logLevels.includes(LOGGING_VARIANTS.warn)) return;

    this.writeToFile(message);
    super.warn(message, optionalParams);
  };

  debug = (message: any, ...optionalParams: Array<any>) => {
    if (!this.logLevels.includes(LOGGING_VARIANTS.debug)) return;

    this.writeToFile(message);
    super.debug(message, optionalParams);
  };

  verbose = (message: any, ...optionalParams: any[]) => {
    if (!this.logLevels.includes(LOGGING_VARIANTS.verbose)) return;

    this.writeToFile(message);
    super.verbose(message, optionalParams);
  };
}
