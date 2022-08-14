import {
  ArgumentMetadata,
  HttpStatus,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { RefreshUserDto } from 'src/modules/auth/dto/refresh-token.dto';

export class CustomValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super(options);
  }

  protected toValidate = (metadata: ArgumentMetadata): boolean => {
    if (metadata.metatype === RefreshUserDto) {
      this.errorHttpStatusCode = HttpStatus.UNAUTHORIZED;
    } else {
      this.errorHttpStatusCode = HttpStatus.BAD_REQUEST;
    }

    return super.toValidate(metadata);
  };
}
