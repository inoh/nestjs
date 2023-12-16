import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import {
  ApiProperty,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UserService } from './service';

class UserRequest {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  email: string;
}

@ApiTags('users')
@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [UserResponse] })
  async getUsers(): Promise<UserResponse[]> {
    return this.userService.users();
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponse })
  async craeteUser(@Body() userData: UserRequest): Promise<UserResponse> {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserResponse })
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserRequest,
  ): Promise<UserResponse> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data: userData,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  async deleteUser(@Param('id') id: string): Promise<UserResponse> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}

export { UserController as Controller };
