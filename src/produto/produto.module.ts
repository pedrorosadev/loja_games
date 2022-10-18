import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaModule } from "src/categoria/categoria.module";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { Produto } from "./entities/produto.entity";
import { ProdutoService } from "./services/produto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
    controllers: [],
    providers: [ProdutoService, CategoriaService],
    exports: [TypeOrmModule]
})

export class ProdutoModule{}