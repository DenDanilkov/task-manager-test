import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { StatusesModule } from './statuses/statuses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TasksModule, StatusesModule, AuthModule],
})
export class AppModule {}
