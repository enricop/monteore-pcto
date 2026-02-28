import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const corso = sequelize.define(
    'corso',
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
        {
          unique: true,
          fields: ['nome', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  corso.associate = (models) => {
    models.corso.belongsToMany(models.user, {
      as: 'studentiIscritti',
      constraints: false,
      through: 'corsoStudentiIscrittiUser',
    });

    models.corso.belongsToMany(models.user, {
      as: 'studentiAmmessi',
      constraints: false,
      through: 'corsoStudentiAmmessiUser',
    });

    models.corso.hasMany(models.file, {
      as: 'logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.corso.getTableName(),
        belongsToColumn: 'logo',
      },
    });
    
    models.corso.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.corso.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.corso.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return corso;
}
