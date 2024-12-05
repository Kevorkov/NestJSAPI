import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Controller('roles')
export class RolesController {

    constructor(private RoleService: RolesService){}

    @ApiOperation({summary:'Создание роли'})
    @ApiResponse({status:200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto){
        return this.RoleService.createRole(dto)
    }

    @ApiOperation({summary:'Получение роли'})
    @ApiResponse({status:200, type: [Role]})
    @Get('/:value')
    getByValue(@Param('value') value: string){
        return this.RoleService.getRoleByValue(value)
    }
}
