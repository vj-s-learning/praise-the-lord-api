import { Module, CacheModule } from '@nestjs/common';
import { BibleController } from './bible.controller';
import { BibleService } from './bible.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [BibleController],
  providers: [BibleService],
})
export class BibleModule {}
