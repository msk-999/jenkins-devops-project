import { UserService } from './user.service';
import { UserDto } from './user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(): Promise<import("./user.entity").User[]>;
    create(dto: UserDto): Promise<UserDto>;
    getById(id: any): Promise<import("./user.entity").User>;
    update(id: string, dto: UserDto): Promise<import("./user.entity").User>;
    delete(id: any): Promise<any>;
}
