import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FotoProduto } from 'src/app/models/FotoProduto';
import { Produto } from 'src/app/models/Produto';
import { CatalogoFotoProdutoService } from 'src/app/service/catalogoFotoProduto.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css'],
})
export class ProdutoUpdateComponent implements OnInit {
  id_produto = '';
  id_foto = '';

  produto: Produto = {
    id: 0,
    codProd: '',
    nomeProd: '',
    descricao: '',
    categoria: 0,
    descriCatedoria: '',
  };

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
    private fotoService: CatalogoFotoProdutoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_produto = this.route.snapshot.paramMap.get('id')!;
    this.findById();
    this.obterFoto();
    this.findByIdFoto();
  }

  cancel(): void {
    this.router.navigate(['admin/produtos']);
  }

  findById(): void {
    const produtoId = parseInt(this.id_produto);
    this.service.findById(produtoId).subscribe((resposta) => {
      this.produto = resposta;
    });
  }

  update(): void {
   
    // Chamada para o serviço que cria o produto no backend, passando os dados do produto.
    this.service.update(this.produto).subscribe(
      (resposta) => {
        const prod_id = resposta.id; // Captura o ID do produto retornado pelo backend.

        // Verificação se há uma foto selecionada para o produto.
        if (this.selecineFoto) {
          // Criação do objeto FormData para enviar o arquivo de imagem.
          const formData = new FormData();
          formData.append('descricao', this.fotoProduto.descricao); // Adiciona a descrição da foto.
          formData.append('arquivo', this.selecineFoto); // Adiciona o arquivo de imagem.

          // O 'file' aqui é um campo do FormData utilizado para enviar o arquivo para o backend.
          formData.append('file', this.selecineFoto); // Adiciona a foto ao FormData.

          // Chamada ao serviço que envia a foto associada ao produto no backend.
          this.fotoService.atualizarFoto(prod_id ?? 0, formData).subscribe(
            (response) => console.log('Upload bem-sucedido!', response), // Sucesso no upload.
            (error) => console.error('Erro no upload:', error) // Caso ocorra algum erro no upload.
          );
        } else {
          console.error('Nenhum arquivo selecionado!'); // Caso não haja foto selecionada, um erro é mostrado no console.
        }

        // Navega para a página de produtos após o cadastro.
        this.router.navigate(['admin/produtos']);

        // Exibe uma mensagem de sucesso após o produto ser cadastrado.
        this.service.message('Produto atualizado com sucesso!');
      },
      (err) => {
        // Caso o produto já tenha sido cadastrado, a mensagem de erro será mostrada.
        if (err.error.error.match('já cadastrado')) {
          this.service.message(err.error.error);
        }
      }
    );
  }

  
  findByIdFoto(): void {
    const id_foto = parseInt(this.id_produto);
    this.fotoService.fotoBuscar(id_foto).subscribe((resposta) => {
      this.fotoProduto = resposta;
    });
  }

  selecineFoto: File | null = null; // Variável para armazenar o arquivo selecionado

  imageUrl: string = './assets/img-admin/image-generica.jpeg';

  // Método para capturar o arquivo selecionado
  selecionarFoto(event: Event): void {
    const input = event.target as HTMLInputElement; // Acessa o input do tipo 'file' que gerou o evento.
    if (input?.files?.length) {
      // Verifica se há arquivos selecionados.
      this.selecineFoto = input.files[0]; // Pega o primeiro arquivo selecionado.

      // Cria uma URL temporária para a imagem selecionada, permitindo sua exibição.
      this.imageUrl = URL.createObjectURL(this.selecineFoto);
      console.log('Arquivo selecionado:', this.selecineFoto.name); // Log do nome do arquivo selecionado.
    }
  }



  // Método para obter a foto e seus headers
  obterFoto(): void {

    const acceptHeader = 'image/jpeg,image/png'; // Cabeçalho para o tipo de resposta que esperamos

    const prod_id = parseInt(this.id_produto);

    this.fotoService.servirFoto(prod_id, acceptHeader).subscribe(
      (resposta) => {
        // A resposta contém tanto o corpo (a imagem) quanto os headers
        const imageBlob = resposta.body; // A foto em formato blob

        // Os headers da resposta
        const headers = resposta.headers;

        // Exibindo os headers, como 'Content-Type'
        const contentType = headers.get('Content-Type');
        console.log('Tipo de conteúdo da imagem:', contentType);

        // Exibindo a imagem no frontend
        this.imageUrl = URL.createObjectURL(imageBlob);
      },
      (error) => {
        console.error('Erro ao obter foto:', error);
      }
    );
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

  categoriaCodigos: number[] = [0, 1, 2, 3, 4, 5];
}
