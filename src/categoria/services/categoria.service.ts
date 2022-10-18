import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoService } from "src/produto/services/produto.service";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";

@Injectable()
export class CategoriaService{
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository:Repository<Categoria>,
        private produtoService: ProdutoService
    ){}
    
    async findAll():Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            relations:{
                produto:true
            }
        })
    }

    async findById(id:number):Promise<Categoria>{
        let categoria = await this.categoriaRepository.findOne({
            where:{
                id
            },
            relations:{
                produto:true
            }
        });

        if(!categoria)
        throw new HttpException('Categoria não encontrada.', HttpStatus.NOT_FOUND)
        return categoria;
    } 

    async findByDescription(descricao:string):Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations:{
                produto:true
            }
        })
    }

    async create(categoria: Categoria):Promise<Categoria>{
        if(categoria.produto){
            let produto = await this.produtoService.findById(categoria.produto.id)

            if(!produto)
            throw new HttpException("Produto não encontrado", HttpStatus.NOT_FOUND);
            
        }

        return await this.categoriaRepository.save(categoria)

    }

    async update(categoria: Categoria):Promise<Categoria>{
        let searchCategory: Categoria = await this.findById(categoria.id)

        if(!searchCategory || !categoria.id)
            throw new HttpException("Categoria não Encontrada.", HttpStatus.NOT_FOUND);

        if(categoria.produto){
            let produto = await this.produtoService.findById(categoria.produto.id);

            if(!produto)
                throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);

            return await this.categoriaRepository.save(categoria);
        }

        return await this.categoriaRepository.save(categoria);
            
    }

    async delete(id:number):Promise<DeleteResult>{
        let searchCategory = await this.findById(id);

        if(!searchCategory)
        throw new HttpException("Categoria não encontrada", HttpStatus.NOT_FOUND);

        return await this.categoriaRepository.delete(id);
        
    }

}