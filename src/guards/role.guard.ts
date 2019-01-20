import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleAccount } from '../interfaces/agg.interface';
import { IAccount } from '../interfaces/agg.interface';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
    private roles: RoleAccount[];
    constructor(..._roles: RoleAccount[]) {
        this.roles = _roles;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // เก็บค่า Request
        const request = context.switchToHttp().getRequest() as Request;
        // ตรวจสอบว่ามี user login เข้ามาหรือไม่
        if (request.user) {
            const userLogin = request.user as IAccount;
            // ค้นหาว่า User login มี Role ตรงกับที่ กำหนดมาหรือป่าว
            const searchRoles = this.roles.filter(role => role == userLogin.role);
            return searchRoles.length > 0;
        }
        return false;
    }

}