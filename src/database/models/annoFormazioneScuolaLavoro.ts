import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const annoFormazioneScuolaLavoro = sequelize.define(
    'annoFormazioneScuolaLavoro',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      numeroAnno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
      },
      nomeAnno: {
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
          fields: ['numeroAnno', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  annoFormazioneScuolaLavoro.associate = (models) => {
    models.annoFormazioneScuolaLavoro.belongsToMany(models.user, {
      as: 'amministratoriCorsiFormazione',
      constraints: false,
      through: 'annoFormazioneScuolaLavoroAmministratoriCorsiFormazioneUser',
    });

    models.annoFormazioneScuolaLavoro.belongsToMany(models.user, {
      as: 'studentiImmatricolati',
      constraints: false,
      through: 'annoFormazioneScuolaLavoroStudentiImmatricolatiUser',
    });


    
    models.annoFormazioneScuolaLavoro.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.annoFormazioneScuolaLavoro.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.annoFormazioneScuolaLavoro.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return annoFormazioneScuolaLavoro;
}
