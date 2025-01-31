import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Post } from "src/posts/posts.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-role.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName:'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example:'1',description:'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey:true})
    id: number

    @ApiProperty({example:'k@mail.ru',description:'Электронная почта'})
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    email: string

    @ApiProperty({description:'Пароль'})
    @Column({type: DataType.STRING, allowNull:false})
    password: string

    @ApiProperty({example:'true',description:'Забанен или нет'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean

    @ApiProperty({example:'Некорректное имя',description:'Причина бана'})
    @Column({type: DataType.STRING, allowNull:true})
    banReason: string

    @BelongsToMany(()=>Role,()=>UserRoles)
    roles: Role[];

    @HasMany(()=> Post)
    posts: Post[];
}