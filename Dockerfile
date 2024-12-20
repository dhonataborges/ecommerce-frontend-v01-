# 1. Use a imagem oficial do Node.js para o ambiente de construção
FROM node:16 AS build

# 2. Defina o diretório de trabalho no contêiner
WORKDIR /app

# 3. Copie o package.json e instale as dependências
COPY package.json ./
RUN npm install

# 4. Copie todo o código-fonte para o contêiner
COPY . .

# 5. Execute o build do site estático (para projetos Angular, React ou Vue)
RUN npm run build

# 6. Use uma imagem leve do Nginx para servir o site estático
FROM nginx:alpine

# 7. Copie os arquivos de build para o diretório de publicação do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 8. Exponha a porta 80 para o servidor web
EXPOSE 80

# 9. Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
