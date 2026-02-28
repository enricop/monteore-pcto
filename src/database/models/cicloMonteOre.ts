import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const cicloMonteOre = sequelize.define(
    'cicloMonteOre',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nomeCiclo: {
        type: DataTypes.TEXT,
      },
      inizioCiclo: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('inizioCiclo')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('inizioCiclo'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      fineCiclo: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('fineCiclo')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('fineCiclo'))
                .format('YYYY-MM-DD')
            : null;
        },
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
          fields: ['nomeCiclo', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  cicloMonteOre.associate = (models) => {
    models.cicloMonteOre.belongsTo(models.user, {
      as: 'amministratoreMonteOre',
      constraints: false,
    });

    models.cicloMonteOre.belongsToMany(models.user, {
      as: 'studenti',
      constraints: false,
      through: 'cicloMonteOreStudentiUser',
    });

    models.cicloMonteOre.belongsToMany(models.corso, {
      as: 'corsi',
      constraints: false,
      through: 'cicloMonteOreCorsiCorso',
    });


    
    models.cicloMonteOre.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.cicloMonteOre.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.cicloMonteOre.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return cicloMonteOre;
}
