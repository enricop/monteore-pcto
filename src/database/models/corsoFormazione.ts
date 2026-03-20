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
      nomeCorso: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      massimoNumeroIscritti: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        }
      },
      attualmenteAttivo: {
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
        {
          unique: true,
          fields: ['nomeCorso', 'tenantId'],
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
    models.corsoFormazione.belongsTo(models.annoScolasticoFormazione, {
      as: 'annoScolastico',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
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
