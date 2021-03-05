import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/utils/image-filter';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { diskStorage } from 'multer';
// import { UpdateArticleDto } from './dto/update-article.dto';
import * as path from 'path'
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: (req: any,file: any, cb: any) => {
          const uploadPath = './images/article';

          if(!existsSync(uploadPath)){
            mkdirSync(uploadPath)
          }
          cb(null, uploadPath)
        },
        filename: (erq: any, file: any, cb: any) => {
          console.log(`${uuid()}${extname(file.originalname)}`)
          cb(null, `${uuid()}${extname(file.originalname)}`)
        }
      })
    })
  )
  create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file
  ) {
    createArticleDto.image = file.filename
    return this.articleService.create(createArticleDto)
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image) {
    const pathfile =  'http://localhost:3000' + '/images/' + image
    return pathfile
  }
}
