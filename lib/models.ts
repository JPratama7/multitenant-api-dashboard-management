import {DataTypes} from "sequelize";
import {db} from "./db";
import {v7} from 'uuid';
import {getClientMetaByUserId} from "@/lib/clientMetaCrud";

export const ClientMeta = db.define('client_meta', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: v7,
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    currentUsage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    maxUsage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    clientSecret: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clientWebhook: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
    }
});

db.sync({ force: false, alter: true }).then(() => {
    console.log('Database & tables created!');
});

