import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";
import { UserRoles } from "./user-role.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName:'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey:true})
    id: number

    @ApiProperty({example:'admin',description:'Роль'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    value: string

    @ApiProperty({description:'Описание роли'})
    @Column({type: DataType.STRING, allowNull:false})
    description: string

    @BelongsToMany(()=>User,()=>UserRoles)
    users: User[];
}