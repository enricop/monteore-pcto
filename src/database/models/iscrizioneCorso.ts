import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const iscrizioneCorso = sequelize.define(
    'iscrizioneCorso',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dataIscrizione: {
        type: DataTypes.DATE,
      },
      attiva: {
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

  iscrizioneCorso.associate = (models) => {
    models.iscrizioneCorso.belongsTo(models.user, {
      as: 'studenteIscritto',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });

    models.iscrizioneCorso.belongsTo(models.corsoFormazione, {
      as: 'corsoIscrizione',
      constraints: false,
      foreignKey: {
        allowNull: false,
      },
    });


    
    models.iscrizioneCorso.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.iscrizioneCorso.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.iscrizioneCorso.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return iscrizioneCorso;
}
