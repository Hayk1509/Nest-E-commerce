import {
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntArrayPipe implements PipeTransform<string, number[]> {
  transform(value: string): number[] {
    if (!value) return [];
    try {
      return value.split(',').map((item) => {
        const parsed = parseInt(item.trim(), 10);
        if (isNaN(parsed)) {
          throw new Error('Invalid number');
        }
        return parsed;
      });
    } catch (error) {
      throw new BadRequestException(
        'Վավերացում չհաջողվեց (հավանական է թվային զանգվածը պետք լինել)',
      );
    }
  }
}
