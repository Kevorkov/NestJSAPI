import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdatePostsDto } from './dto/update-posts.dto';

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService){}
    
    @Post()
    @UseInterceptors(FileInterceptor("image"))
    createpost(@Body() dto: CreatePostDto, @UploadedFile() img){
        return this.postService.createPost(dto, img)
    }

    @Get()
    getAllPosts(){
        return this.postService.getAllPosts()
    }

    @Get('/:userId')
    getPostByUserId(@Param('userId') userId: number){
        return this.postService.getPostByUserId(userId)
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() updateDto: UpdatePostsDto){
        return this.postService.updatePostById(id, updateDto)
    }

    @Delete('/:id')
    remove(@Param('id') id: number,){
        return this.postService.removePostById(id)
    }
}
