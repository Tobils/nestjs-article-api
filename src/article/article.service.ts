import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>
  ){}

  async create(createArticleDto: CreateArticleDto) {
    const article = new Article()
    const imgpath = 'http://localhost:3000' + '/images/article/' + createArticleDto.image
    article.title = createArticleDto.title
    article.description = createArticleDto.description
    article.imagepath = imgpath
    
    return await this.articlesRepository.save(article)
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
