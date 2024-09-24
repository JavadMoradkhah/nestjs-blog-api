import { registerAs } from '@nestjs/config';
import { AppEnvironment } from 'src/common/enums/app-environment.enum';

export default registerAs('app', () => ({
  environment: process.env.NODE_ENV ?? AppEnvironment.DEVELOPMENT,
}));
