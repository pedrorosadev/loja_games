import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaController } from './categoria/controllers/categoria.controller';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaService } from './categoria/services/categoria.service';
import { ProdutoController } from './produto/controllers/produto.controller';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoService } from './produto/services/produto.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_lojagames',
      entities: [Categoria, Produto],
      synchronize: true
    }),
    CategoriaModule,
    ProdutoModule
  ],
  controllers: [ProdutoController, CategoriaController],
  providers: [ProdutoService, CategoriaService],
})
export class AppModule {}
