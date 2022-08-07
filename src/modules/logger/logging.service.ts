import { Injectable, ConsoleLogger } from '@nestjs/common';
import { join } from 'path';
import { appendFile, mkdir, stat, writeFile } from 'fs/promises';
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

  private checkExistFileOrFolder = async (path: string): Promise<boolean> => {
    let exist = true;
    await stat(path).catch(async () => {
      exist = false;
    });

    return exist;
  };

  private createDirectoryForFiles = async (): Promise<void> => {
    const existFolder = await this.checkExistFileOrFolder(
      this.filesLogDirectory,
    );

    if (existFolder) return;

    await mkdir(this.filesLogDirectory, { recursive: true }).catch(() => {
      throw new Error(ERROR_CREATE_DIRECTORY);
    });
  };

  private createFileForLogs = async (filePath: string): Promise<void> => {
    const existFile = await this.checkExistFileOrFolder(filePath);

    if (existFile) return;

    await writeFile(filePath, '', {
      encoding: 'utf8',
      flag: 'w',
    }).catch(() => {
      throw Error(ERROR_CREATE_FILE);
    });
  };

  private checkCurrentNumberFile = async (
    variantLog = LOGGING_FILES.log,
  ): Promise<void> => {
    const filePath =
      variantLog === LOGGING_FILES.log
        ? this.getLogFilePath()
        : this.getErrorFilePath();

    const fileExist = await this.checkExistFileOrFolder(filePath);

    if (!fileExist) {
      return await this.createFileForLogs(filePath);
    }

    await stat(filePath)
      .then(async (stats) => {
        if (stats.size < this.maxFileSize) return;

        variantLog === LOGGING_FILES.log
          ? this.fileLogNumber++
          : this.fileErrorNumber++;

        await this.checkCurrentNumberFile(variantLog);
      })
      .catch(async () => null);
  };

  private checkFiles = async (): Promise<void> => {
    await this.createDirectoryForFiles();
    await this.checkCurrentNumberFile(LOGGING_FILES.log);
    await this.checkCurrentNumberFile(LOGGING_FILES.error);
  };

  private checkFileSize = async (variantLog: LOGGING_FILES): Promise<void> => {
    let filePath =
      variantLog === LOGGING_FILES.log
        ? this.getLogFilePath()
        : this.getErrorFilePath();

    await stat(filePath)
      .then(async (stats) => {
        if (stats.size < this.maxFileSize) return;

        if (variantLog === LOGGING_FILES.log) {
          this.fileLogNumber++;
          filePath = this.getLogFilePath();
        } else {
          this.fileErrorNumber++;
          filePath = this.getErrorFilePath();
        }

        await this.createFileForLogs(filePath);
      })
      .catch(() => null);
  };

  private writeToFile = async (
    message: string,
    variantLog = LOGGING_FILES.log,
  ) => {
    try {
      await this.checkFileSize(variantLog);

      const filePath =
        variantLog === LOGGING_FILES.log
          ? this.getLogFilePath()
          : this.getErrorFilePath();

      await appendFile(filePath, message, 'utf8').catch(() => {
        throw Error(ERROR_WRITE_FILE);
      });
    } catch (error) {
      console.log(ERROR_WRITE_FILE);
      this.checkFiles();
    }
  };

  log(message: any, ...optionalParams: Array<any>) {
    if (!this.logLevels.includes(LOGGING_VARIANTS.log)) return;

    this.writeToFile(message);
    super.log(message, optionalParams);
  }

  error(message: any, ...optionalParams: Array<any>) {
    if (!this.logLevels.includes(LOGGING_VARIANTS.error)) return;

    this.writeToFile(message, LOGGING_FILES.error);
    super.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: Array<any>) {
    if (!this.logLevels.includes(LOGGING_VARIANTS.warn)) return;

    this.writeToFile(message);
    super.warn(message, optionalParams);
  }

  debug(message: any, ...optionalParams: Array<any>) {
    if (!this.logLevels.includes(LOGGING_VARIANTS.debug)) return;

    this.writeToFile(message);
    super.debug(message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    if (!this.logLevels.includes(LOGGING_VARIANTS.verbose)) return;

    this.writeToFile(message);
    super.verbose(message, optionalParams);
  }
}
