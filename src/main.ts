import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config();

console.log(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  console.log("DATABASE_URL:", configService.get<string>("DATABASE_URL"));

  await app.listen(3000);
}

bootstrap();
