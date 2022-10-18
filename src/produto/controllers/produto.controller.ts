import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";

@Controller('/produto')
export class ProdutoController{
    constructor(private readonly produtoService: ProdutoService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll():Promise<Produto[]>{
        return this.produtoService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number):Promise<Produto>{
        return this.produtoService.findById(id);
    }
    
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome:string):Promise<Produto[]>{
        return this.produtoService.findByName(nome);
    }

    @Get('/valor/:valor')
    @HttpCode(HttpStatus.OK)
    findByPrice(@Param('valor') valor:number):Promise<Produto[]>{
        return this.produtoService.findByPrice(valor);
    }

    @Get('/marca/:marca')
    @HttpCode(HttpStatus.OK)
    findByBrand(@Param('marca') marca:string):Promise<Produto[]>{
        return this.produtoService.findByBrand(marca);
    }

    @Get('/estoque/:estoque')
    @HttpCode(HttpStatus.OK)
    findByInventory(@Param('estoque') qtd_estoque:number):Promise<Produto[]>{
        return this.produtoService.findByInventory(qtd_estoque);
    }

    @Get('/fabricante/:fabricante')
    @HttpCode(HttpStatus.OK)
    findByMaker(@Param('fabricante') fabricante:string):Promise<Produto[]>{
        return this.produtoService.findByMaker(fabricante);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK)
    findByDescription(@Param('descricao') descricao:string):Promise<Produto[]>{
        return this.produtoService.findByDescription(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() categoria: Produto) : Promise<Produto>{
        return this.produtoService.create(categoria)
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Produto) : Promise<Produto>{
        return this.produtoService.update(categoria)
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id:number){
        return this.produtoService.delete(id)
    }
}