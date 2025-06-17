"use strict";

/**
 * Migration for creating the client_meta table for ClientMeta entity.
 * Follows the Sequelize migration conventions.
 */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("client_meta", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
        allowNull: false,
      },
      teamName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      currentUsage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      maxUsage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000,
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("client_meta");
  },
};
