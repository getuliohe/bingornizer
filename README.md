##Sistema de Gerenciamento de eventos e cartelas de bingo

#Configuração
mudar a configuração de banco de dados no config/config.json

#Instalação e para rodar o servidor

npm install
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

node index.js