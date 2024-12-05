import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService){}

    async createPost(dto: CreatePostDto, img: any){
        const fileName = await this.fileService.createFile(img)
        const post = await this.postRepository.create({...dto, img: fileName});
        return post;
    }

    async getAllPosts(){
        const post = await this.postRepository.findAll({include:{all:true}});
        return post;
   }

    async getPostByUserId(userId: number){
    const post = await this.postRepository.findAll({where: {userId}, include:{all:true}});
    return post;
    }

    async removePostById(id: number): Promise<void> {
        const post = await this.postRepository.findOne({where: {id}});
        if (!post) {throw new NotFoundException('Пост не найден')}
        await post.destroy();
    }

    async updatePostById(id: number, updateDto: UpdatePostsDto){
        
        const post = await this.postRepository.findOne({where: {id}});
        
        if (!post) {throw new NotFoundException('Пост не найден')} 
        
        const updatedPost = await this.postRepository.update(updateDto, {where: {id}}); 
        
        return updatedPost
    }
}