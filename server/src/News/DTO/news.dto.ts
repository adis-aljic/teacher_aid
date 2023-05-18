import { IsNotEmpty, MaxLength, max } from "class-validator"

export class CreateNewsDTO {
    @IsNotEmpty()
    readonly classId : number
    
    readonly  url : string
    
    @IsNotEmpty()
    readonly title: string
    
    @IsNotEmpty()
    @MaxLength(400)
   readonly text : string
}