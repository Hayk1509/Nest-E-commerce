import { BadRequestException } from '@nestjs/common';

export class CustomBadRequestException extends BadRequestException {
  constructor(message?: string, errorCode?: string) {
    super({
      statusCode: 400,
      error: 'Bad request',
      message: message || 'Մուտքաբերվող տվյալները սխալ են',
      errorCode: errorCode || 'BAD_REQUEST',
      why: 'This custom Exception from Hayk',
    });
  }
}
