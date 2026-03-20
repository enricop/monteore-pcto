import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const iscrizione = sequelize.define(
    'iscrizione',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dataIscrizione: {
        type: DataTypes.DATE,
      },
      attualmenteAttiva: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,    
        validate: {
          len: [0, 255],
        },    
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['importHash', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },

      ],
      timestamps: true,
      paranoid: true,
    },
  );

  iscrizione.associate = (models) => {
    models.iscrizione.belongsTo(models.user, {
      as: 'studente',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.iscrizione.belongsTo(models.corsoFormazione, {
      as: 'corso',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });


    
    models.iscrizione.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.iscrizione.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.iscrizione.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return iscrizione;
}
