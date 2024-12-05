import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/user.model";


interface PostCreationAttrs {
    title: string,
    content: string,
    userId: number,
    img: string,


}

@Table({tableName:'posts'})
export class Post extends Model<Post, PostCreationAttrs> {

    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement:true, primaryKey:true})
    id: number

    
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    title: string

   
    @Column({type: DataType.STRING, allowNull:false})
    content: string

    @Column({type: DataType.STRING})
    img: string

    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(()=>User)
    author: User


}