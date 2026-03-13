import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const corsoFormazione = sequelize.define(
    'corsoFormazione',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.TEXT,
      },
      massimoNumeroIscritti: {
        type: DataTypes.INTEGER,
      },
      attivo: {
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

  corsoFormazione.associate = (models) => {
    models.corsoFormazione.belongsToMany(models.user, {
      as: 'studentiIscritti',
      constraints: false,
      through: 'corsoFormazioneStudentiIscrittiUser',
    });

    models.corsoFormazione.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.corsoFormazione.getTableName(),
        belongsToColumn: 'logo',
      },
    });
    
    models.corsoFormazione.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.corsoFormazione.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.corsoFormazione.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return corsoFormazione;
}
