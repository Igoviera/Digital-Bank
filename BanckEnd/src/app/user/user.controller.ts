import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards, Request} from '@nestjs/common';
import { CreateUserDto } from './user.Dto';
import { UserService } from './user.service';
import { UsertransferDto } from './tranfer.dto'
import { JwtAuthGuard } from 'src/auth/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@Controller('users')
@ApiTags('Usuário')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('cadastrar')
  @ApiOperation({summary:'Cadastrar usuário'})
  @ApiResponse({status:200, description:'Usuário criado com sucesso'})
  async create(@Body() data: CreateUserDto){
    return this.userService.create(data)
  }

  @Get(':id')
  @ApiOperation({summary: 'Lista usuario por ID'})
  @ApiResponse({status:200, description:'Usuário retornado com sucesso'})
  @ApiResponse({status:409, description:'Usuário não encontrado'})
  async findId(@Param('id') id: string){
    return await this.userService.findId(id)
  }

  // @Put('atualizar:id')
  // async update(@Param('id') id:string, @Body() data: CreateUserDto){
  //   return this.userService.update(id,data)
  // }

  // @Put(':username/:balance')
  // async transfer(@Param('username','balance') username: string, balance:string){
  //   return (username, balance)
  // }

  @UseGuards(JwtAuthGuard)    
  @Patch('tranferir:username')
  @ApiOperation({summary: 'Tranferir dinheiro'})
  @ApiResponse({status:200, description:'Tranferência realizada com sucesso'})
  @ApiResponse({status:409, description:'Usuário não encontrado'})
  async transfer(
      @Param('username') usernameReceiver: string, 
      @Body() { balance}: UsertransferDto, 
      @Request() req: any
    ){  
      const usernameSender = req.user.username
    return await this.userService.transferUsername(usernameReceiver,usernameSender, balance)   
  }
}
