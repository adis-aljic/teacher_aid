import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "./news.entity";
import { CreateNewsDTO } from "./DTO/news.dto";

@Injectable()
export class NewsService {
    constructor(@InjectRepository(NewsEntity) private readonly newsRepository : Repository<NewsEntity>){}

    async createNews(createNewsDTO : CreateNewsDTO){
        const news =  await this.newsRepository.save(createNewsDTO)
            return news
    }
}