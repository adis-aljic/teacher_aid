import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NewsEntity } from "./news.entity";
import { CreateNewsDTO } from "./DTO/news.dto";
import { ClassesEntity } from "src/Classes/classes.entity";
import { UserEntity } from "src/User/user.entity";

@Injectable()
export class NewsService {
    constructor(@InjectRepository(NewsEntity) private readonly newsRepository : Repository<NewsEntity>){}

    async createNews(createNewsDto:CreateNewsDTO) : Promise<NewsEntity>{
        const bodyNews = {
            url : createNewsDto.url,
            text : createNewsDto.text,
            title : createNewsDto.title,
            classes : createNewsDto.classes,
        }
        const user = createNewsDto.user as UserEntity;
        const news = new NewsEntity()
        Object.assign(news, bodyNews) 
        // console.log(news);
        // console.log("news basic ");
        news.user = [user]
        // news = schoolClass
        console.log(news);
        // console.log("news after ");
        
      return  await this.newsRepository.save(news)
    }
}