import { DataTypes, Model} from "../Dependencies.ts"

export default class User extends Model {
    static table  = 'users'

    static timestamps = true;

    static fields = {
      id: {
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
}