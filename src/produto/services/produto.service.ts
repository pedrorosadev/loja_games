import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "src/categoria/services/categoria.service";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService{
    constructor(
        @InjectRepository(Produto)
        private produtoRepository:Repository<Produto>,
        private categoriaService: CategoriaService
    ){}

    async findAll():Promise<Produto[]>{
        return await this.produtoRepository.find({
            relations:{
                categoria: true
            }
        });
    }

    async findById(id:number):Promise<Produto>{
        return await this.produtoRepository.findOne({
            where:{
                id
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByName(nome:string):Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                nome: ILike(`%${nome}%`)
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByPrice(valor:number):Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                valor
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByBrand(marca:string):Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                marca: ILike(`%${marca}%`)
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByMaker(fabricante:string):Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                fabricante: ILike(`%${fabricante}%`)
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByInventory(qtd_estoque:number): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                qtd_estoque
            },
            relations:{
                categoria: true
            }
        })
    }

    async findByDescription(descricao:string):Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                categoria: true
            }
        })
    }

    async create(produto: Produto):Promise<Produto>{
        if(produto.categoria){
            let categoria = await this.categoriaService.findById(produto.categoria.id)

            if(!categoria)
                throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND)
        }
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto):Promise<Produto>{
        let searchProduct: Produto = await this.findById(produto.id);
        
        if(!searchProduct || !produto.id)
        throw new HttpException(`Produto não encontrado.`, HttpStatus.NOT_FOUND)

        if(produto.categoria){
            let category = await this.categoriaService.findById(produto.categoria.id)

            if(!category)
                throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND)

                return await this.produtoRepository.save(produto);
        }
        return await this.produtoRepository.save(produto)
    }

    async delete(id:number): Promise<DeleteResult>{
        let searchProduct = await this.findById(id);
        
        if(!searchProduct)
        throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND)
        return await this.produtoRepository.delete(id);
    }
}