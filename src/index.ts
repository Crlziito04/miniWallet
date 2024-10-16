import { sequelize } from "./config/config.mySql";
import { APP_PORT } from "./config/envs";
import app from "./server";

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sincronizando los modelos con la base de datos
    //await sequelize.sync({ alter: true });
    //await sequelize.drop();
    console.log("Database has been synchronized successfully.");

    app.listen(APP_PORT, () => {
      console.log("app is listening on port " + APP_PORT);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();
