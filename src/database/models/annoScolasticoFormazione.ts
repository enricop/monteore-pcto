import { DataTypes } from 'sequelize';import moment from 'moment';

export default function (sequelize) {
  const annoScolasticoFormazione = sequelize.define(
    'annoScolasticoFormazione',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      inizioAnnoScolastico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {

        }
      },
      nomeAnnoScolastico: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          len: [4, 8],
          notEmpty: true,
        }
      },
      dataInizioCicloFormazione: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('dataInizioCicloFormazione')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('dataInizioCicloFormazione'))
                .format('YYYY-MM-DD')
            : null;
        },
      },
      dataFineCicloFormazione: {
        type: DataTypes.DATEONLY,
        get: function() {
          // @ts-ignore
          return this.getDataValue('dataFineCicloFormazione')
            ? moment
                // @ts-ignore
                .utc(this.getDataValue('dataFineCicloFormazione'))
                .format('YYYY-MM-DD')
            : null;
        },
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
          fields: ['inizioAnnoScolastico', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
        {
          unique: true,
          fields: ['nomeAnnoScolastico', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
      paranoid: true,
    },
  );

  annoScolasticoFormazione.associate = (models) => {
    models.annoScolasticoFormazione.belongsToMany(models.user, {
      as: 'amministratoriCorsi',
      constraints: false,
      through: 'annoScolasticoFormazioneAmministratoriCorsiUser',
    });

    models.annoScolasticoFormazione.belongsToMany(models.user, {
      as: 'studentiImmatricolati',
      constraints: false,
      through: 'annoScolasticoFormazioneStudentiImmatricolatiUser',
    });


    
    models.annoScolasticoFormazione.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.annoScolasticoFormazione.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.annoScolasticoFormazione.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return annoScolasticoFormazione;
}
