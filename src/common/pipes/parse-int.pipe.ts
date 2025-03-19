import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class CustomParseIntPipe
  implements PipeTransform<number | string, number | undefined>
{
  transform(value: string | number): number | undefined {
    if (!value) return 0;
    try {
      if (typeof value === 'number') return value;
      if (typeof value === 'string') return parseInt(value, 10);
    } catch (error) {
      throw new BadRequestException(
        'Վավերացում չհաջողվեց (հավանական է թվային զանգվածը պետք լինել)',
      );
    }
  }
}
