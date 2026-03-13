import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import AnnoFormazioneScuolaLavoroRepository from '../database/repositories/annoFormazioneScuolaLavoroRepository';
import CorsoFormazioneRepository from '../database/repositories/corsoFormazioneRepository';
import UserRepository from '../database/repositories/userRepository';

export default class AnnoFormazioneScuolaLavoroService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.amministratoriCorsiFormazione = await UserRepository.filterIdsInTenant(data.amministratoriCorsiFormazione, { ...this.options, transaction });
      data.studentiImmatricolati = await UserRepository.filterIdsInTenant(data.studentiImmatricolati, { ...this.options, transaction });
      data.corsiDisponibili = await CorsoFormazioneRepository.filterIdsInTenant(data.corsiDisponibili, { ...this.options, transaction });

      const record = await AnnoFormazioneScuolaLavoroRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'annoFormazioneScuolaLavoro',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.amministratoriCorsiFormazione = await UserRepository.filterIdsInTenant(data.amministratoriCorsiFormazione, { ...this.options, transaction });
      data.studentiImmatricolati = await UserRepository.filterIdsInTenant(data.studentiImmatricolati, { ...this.options, transaction });
      data.corsiDisponibili = await CorsoFormazioneRepository.filterIdsInTenant(data.corsiDisponibili, { ...this.options, transaction });

      const record = await AnnoFormazioneScuolaLavoroRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'annoFormazioneScuolaLavoro',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await AnnoFormazioneScuolaLavoroRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return AnnoFormazioneScuolaLavoroRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return AnnoFormazioneScuolaLavoroRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return AnnoFormazioneScuolaLavoroRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await AnnoFormazioneScuolaLavoroRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
