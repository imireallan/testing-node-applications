import mongoose from "mongoose";
import config from '@server/config'

export const connect = () =>
  mongoose.connect(config.databaseUrl[config.environment], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export const disconnect = () => mongoose.connection.close();
