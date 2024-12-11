##Sistema de Gerenciamento de eventos e cartelas de bingo

#Instalação e para rodar o servidor

npm install
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all

node index.js