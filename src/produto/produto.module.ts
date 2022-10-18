import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "src/categoria/categoria.module";
import { CategoriaController } from "src/categoria/controllers/categoria.controller";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { ProdutoController } from "./controllers/produto.controller";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    controllers: [ProdutoController],
    providers: [ProdutoService],
    exports: [TypeOrmModule]
})

export class ProdutoModule{}