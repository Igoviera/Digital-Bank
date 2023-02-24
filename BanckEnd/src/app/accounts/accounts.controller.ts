import { Controller} from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // @Patch('tranfer/:id')
  // async transfer(@Param('id') id: string, @Body() data: TranferDto){
  //   return await this.accountsService.findAll()
  // }

}
