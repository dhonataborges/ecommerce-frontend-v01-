import { ParseSourceFile } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FotoProduto } from 'src/app/models/FotoProduto';
import { Produto } from 'src/app/models/Produto';
import { CatalogoFotoProdutoService } from 'src/app/service/catalogoFotoProduto.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css'],
})
export class ProdutoCreateComponent implements OnInit {
  produto: Produto = {
    id: 0,
    codProd: '',
    nomeProd: '',
    descricao: '',
    categoria: 0,
    descriCatedoria: '',
  }

  fotoProduto: FotoProduto = {
    produto: {
      codProd: '',
      nomeProd: '',
      descricao: '',
      categoria: 0,
      descriCatedoria: '',
    } as Produto,
    nomeArquivo: '',
    descricao: '',
    contentType: '',
    tamanho: 0,
  };

  constructor(
    private router: Router,
    private service: ProdutoService,
    private fotoService: CatalogoFotoProdutoService
  ) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['admin/produtos']);
  }

  
  selecioneFoto: File | null = null; // Variável para armazenar o arquivo selecionado

  imageUrl: string = './assets/img-admin/image-generica.jpeg';

  create(): void {
    // Criação de um objeto 'produtoParaEnviar' para enviar os dados do produto
    const produtoParaEnviar: Produto = {
      codProd: this.produto.codProd, // Código do produto
      nomeProd: this.produto.nomeProd, // Nome do produto
      descricao: this.produto.descricao, // Descrição do produto
      categoria: this.produto.categoria, // Categoria do produto
      descriCatedoria: this.produto.descriCatedoria, // Descrição da categoria
    };
  
  // Chamada para o serviço que cria o produto no backend
  this.service.create(produtoParaEnviar).subscribe({
    next: (resposta) => {
      const prod_id = resposta.id; // Captura o ID do produto retornado pelo backend.

      // Verificação se há uma foto selecionada para o produto
      if (this.selecioneFoto) {
        // Criação do objeto FormData para enviar o arquivo de imagem
        const formData = new FormData();
        formData.append('descricao', this.fotoProduto?.descricao || 'Foto padrão'); // Adiciona a descrição da foto
        
        formData.append('arquivo', this.selecioneFoto); // Adiciona o arquivo de imagem.
        formData.append('file', this.selecioneFoto); // Adiciona a foto ao FormData

        // Chamada ao serviço que envia a foto associada ao produto no backend
        this.fotoService.atualizarFoto(prod_id ?? 0, formData).subscribe({
          next: (resposta) => {
            console.log('Upload bem-sucedido!', resposta);
            this.service.message('Produto cadastrado e foto associada com sucesso!');
            this.router.navigate(['admin/produtos']); // Redireciona para a página de produtos
          },
          error: (error) => {
            console.error('Erro no upload:', error);
            this.service.message('Produto cadastrado, mas ocorreu um erro ao associar a foto.');
            this.router.navigate(['admin/produtos']); // Redireciona mesmo com erro no upload
          },
        });
      } else {
        console.warn('Nenhuma foto selecionada.');
        this.service.message('Produto cadastrado sem foto.');
        this.router.navigate(['admin/produtos']); // Redireciona para a página de produtos
      }
    },
    error: (err) => {
      const mensagemErro = err?.error?.detail;
      if (mensagemErro?.includes(`Produto com o código ${produtoParaEnviar.codProd} já está cadastrado!`)) {
        this.service.message(`Erro: Produto com o código ${produtoParaEnviar.codProd} já está cadastrado!`);
      } else {
        this.service.message('Erro ao cadastrar o produto. Verifique os campos e tente novamente.');
        console.error('Erro ao cadastrar o produto:', err);
      }
    },
  });
}

  
  // Método para capturar o arquivo selecionado
  selecionarFoto(event: Event): void {
    const input = event.target as HTMLInputElement; // Acessa o input do tipo 'file' que gerou o evento.
    if (input?.files?.length) {
      // Verifica se há arquivos selecionados.
      this.selecioneFoto = input.files[0]; // Pega o primeiro arquivo selecionado.

      // Cria uma URL temporária para a imagem selecionada, permitindo sua exibição.
      this.imageUrl = URL.createObjectURL(this.selecioneFoto);
      console.log('Arquivo selecionado:', this.selecioneFoto.name); // Log do nome do arquivo selecionado.
    }
  }

  // ESSE CODIGO É RESPONSALVEL POR EXIBIR O CODIGO E A DESCRIÇÃO DE CATEGORIAS
  categoriaDescricao: { [key: number]: string } = {
    0: 'Selecione',
    1: 'PERFUMARIA',
    2: 'CORPO E BANHO',
    3: 'CABELOS',
    4: 'ROSTO',
    5: 'MAQUIAGEM',
    6: 'INFANTIL',
  };

  getCategoriaDescricao(codigo: number): string {
    return this.categoriaDescricao[codigo] || 'Desconhecido'; // Retorna a descrição da categoria ou 'Desconhecido' se o código não for encontrado.
  }

  categoriaCodigos: number[] = [0, 1, 2, 3, 4, 5, 6];

  obterFotoProduto(prod_id: number): void {
    const acceptHeader = 'application/json'; // Cabeçalho que especifica o tipo de resposta esperado.

    this.fotoService
      .servirFoto(prod_id, acceptHeader) // Chama o serviço para obter a foto associada ao produto.
      .subscribe(
        (foto) => {
          this.fotoProduto = foto; // Armazena a foto recebida na variável 'fotoProduto'.
        },
        (err) => {
          if (err.error.error.match('Erro ao obter foto do produto')) {
            this.service.message(err.error.error); // Exibe mensagem de erro se houver falha ao obter a foto.
          }
        }
      );
  }
}
