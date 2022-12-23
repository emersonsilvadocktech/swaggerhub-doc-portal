# # Imagem de Origem
# FROM node:12-alpine
# # Diretório de trabalho(é onde a aplicação ficará dentro do container).
# WORKDIR /app
# # Adicionando `/app/node_modules/.bin` para o $PATH
# ENV PATH=/app/node_modules/.bin:$PATH
# # Instalando dependências da aplicação e armazenando em cache.
# COPY ./public/* /app/public/
# COPY ./src/* /app/src/
# COPY package.json /app/package.json
# RUN ls -l
# RUN npm install --silent
# #RUN npm install react-scripts@3.3.1 -g --silent
# # Inicializa a aplicação
# EXPOSE 3000
# CMD ["npm", "start"]

# build environment
FROM node:12-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY public/ /app/public/
COPY src/ /app/src/
COPY package.json /app/package.json
RUN npm install --silent
# RUN npm install react-scripts@3.0.1 -g — silent
RUN npm run build
# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]