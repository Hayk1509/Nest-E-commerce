import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Redirect,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => Reflect.metadata(ROLES_KEY, roles);
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const reqiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!reqiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return reqiredRoles.includes(user?.role);
  }
}
