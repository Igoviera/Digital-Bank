import { Controller, Post, UseGuards, Get, Request, } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard, LocalAuthGuard } from "./guards";
import { CurrentUser } from './decorators/current-user.decorator';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger/dist/decorators";

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly servicoAutenticacao: AuthService) {}

  @Post('login')
  @ApiOperation({summary:'Realizar login'})
  @ApiResponse({status:200, description:'Login realizado com sucesso'})
  @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
    return await this.servicoAutenticacao.Login(req.user);
  }

  @Post('logout')
  async logout(@CurrentUser() user) {
    return await this.servicoAutenticacao.Logout(user.id);
  }

  @UseGuards(JwtAuthGuard)  
  @Get('me')
  @ApiOperation({summary:'Vizualizar quem esta logado'})
  getMe(@Request() req){
    return req.user
  }
}
