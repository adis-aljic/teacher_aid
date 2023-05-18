import { Body, Controller, Post } from "@nestjs/common";
import { CreateNewsDTO } from "./DTO/news.dto";
import { NewsService } from "./news.service";

@Controller()
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post("api/news")
    async createNews (@Body() createNewsDTO : CreateNewsDTO) :Promise <CreateNewsDTO> {
    console.log(createNewsDTO);
            
        return await this.newsService.createNews(createNewsDTO)   

            
    }
    
}