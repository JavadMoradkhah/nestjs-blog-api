import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import environmentSchema from 'src/config/environment.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const NODE_ENV = process.env.NODE_ENV;
const ENV_FILE = !NODE_ENV ? '.env.development' : `.env.${NODE_ENV}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: ENV_FILE,
      validationSchema: environmentSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
      type: 'postgres',
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          synchronize: configService.get<boolean>('database.synchronize'),
      autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
