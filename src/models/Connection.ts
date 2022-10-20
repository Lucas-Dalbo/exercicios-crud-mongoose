import 'dotenv/config';
import mongoose from 'mongoose';

const options = {
  user: process.env.MONGO_INITDB_ROOT_USERNAME || 'root', // Usuário do banco de dados.
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD || '123456', // senha do usuário do banco de dados.
  autoIndex: false, // Não cria index para cada inserção de dado no banco.
  dbName: process.env.MONGO_INITDB_DATABASE || 'glassesStore', // Define qual banco de dados vou utilizar.
};

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || 'mongodb://localhost:27017/glassesStore?authSource=admin',
) => mongoose.connect(mongoDatabaseURI, options);

export default connectToDatabase;