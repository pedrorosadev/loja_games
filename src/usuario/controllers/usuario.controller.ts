import { Body, Controller, Get, HttpCode, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";

@Controller('/usuario')
export class UsuarioController{
    constructor(private readonly usuarioService: UsuarioService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll():Promise<Usuario[]>{
        return await this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.OK)
    async create(@Body() usuario: Usuario):Promise<Usuario>{
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario):Promise<Usuario>{
        return await this.usuarioService.update(usuario);
    }
}