import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  welcomingMessage(): string {
    return 'يالله حيه مافيه شي هنا، موقع كل شي داخل backend/readme.md';
  }
}
