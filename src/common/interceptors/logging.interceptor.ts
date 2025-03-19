import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const now = Date.now();
    console.log(request.url);
    console.log(`Մուտքաբերվող հարցում: ${request.method} ${request.url}`);
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Պատասխան ուղարկված է ${Date.now() - now} մս հետո`),
        ),
      );
  }
}
