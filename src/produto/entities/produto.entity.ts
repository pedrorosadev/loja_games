import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_produto'})
export class Produto{
    @PrimaryGeneratedColumn()
    id : number

    @IsNotEmpty()
    @Column({length: 50, nullable:false})
    nome : string

    @IsNotEmpty()
    @Column({nullable:false, zerofill:true})
    valor : number

    @IsNotEmpty()
    @Column({nullable:false, zerofill:true})
    qtd_estoque

    @IsNotEmpty()
    @Column({length: 50, nullable:true})
    marca : string

    @IsNotEmpty()
    @Column({length:50, nullable:true})
    fabricante : string

    @IsNotEmpty()
    @Column({length:280, nullable:true})
    descricao

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria;

}