import { Body, Controller, Post } from "@nestjs/common";
import { CreateNewsDTO } from "./DTO/news.dto";
import { NewsService } from "./news.service";

@Controller()
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post("api/news")
    async createNews (@Body() createNewsDto : CreateNewsDTO) :Promise <any> {
    console.log(createNewsDto);
    // console.log(schoolClass);
            
        return await this.newsService.createNews(createNewsDto)   

            
    }
    


}