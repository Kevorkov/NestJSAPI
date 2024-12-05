import { Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { JwtAuthGuart } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Пользователи')
@Controller('users')

export class UsersController {

    constructor(private UsersService: UsersService){}

    @ApiOperation({summary:'Создание пользователя'})
    @ApiResponse({status:200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.UsersService.createUser(userDto)
    }

    @ApiOperation({summary:'Получить всех пользователей'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(JwtAuthGuart)
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.UsersService.getAllUsers()
    }

    @ApiOperation({summary:'Выдать роль'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(JwtAuthGuart)
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: addRoleDto){
        return this.UsersService.addRole(dto)
    }

    @ApiOperation({summary:'Забанить пользователя'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(JwtAuthGuart)
    @Roles('admin')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body()dto: BanUserDto){
        return this.UsersService.banUser(dto)
    }
}
