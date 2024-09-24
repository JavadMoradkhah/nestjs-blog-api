import * as Joi from 'joi';
import { AppEnvironment } from 'src/common/enums/app-environment.enum';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid(
      AppEnvironment.DEVELOPMENT,
      AppEnvironment.PRODUCTION,
      AppEnvironment.TEST,
    )
    .default(AppEnvironment.DEVELOPMENT),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});
