'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('Declarations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        declaredMonth: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        hasWorked: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        hasTrained: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        trainingStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        trainingEndDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        trainingDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        hasInternship: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        internshipStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        internshipEndDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        internshipDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        hasSickLeave: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        sickLeaveStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        sickLeaveEndDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        sickLeaveDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        hasMaternityLeave: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        maternityLeaveStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        maternityLeaveDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        hasRetirement: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        retirementStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        retirementDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        hasInvalidity: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        invalidityStartDate: {
          defaultValue: null,
          type: Sequelize.DATEONLY,
        },
        invalidityDocument: {
          defaultValue: null,
          type: Sequelize.STRING,
        },
        isLookingForJob: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        jobSearchEndDate: {
          type: Sequelize.DATEONLY,
        },
        jobSearchStopMotive: {
          type: Sequelize.STRING,
        },
        hasFinishedDeclaringEmployers: {
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        isFinished: {
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex('Declarations', {
          fields: ['userId'],
        }),
      )
      .then(() =>
        queryInterface.addIndex('Declarations', {
          fields: ['declaredMonth'],
        }),
      )
      .then(() =>
        queryInterface.addIndex('Declarations', {
          fields: ['userId', 'declaredMonth'],
          unique: true,
        }),
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Declarations')
  },
}
