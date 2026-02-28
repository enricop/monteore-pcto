import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import CicloMonteOreRepository from '../database/repositories/cicloMonteOreRepository';
import CorsoRepository from '../database/repositories/corsoRepository';
import UserRepository from '../database/repositories/userRepository';

export default class CicloMonteOreService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.amministratoreMonteOre = await UserRepository.filterIdInTenant(data.amministratoreMonteOre, { ...this.options, transaction });
      data.studenti = await UserRepository.filterIdsInTenant(data.studenti, { ...this.options, transaction });
      data.corsi = await CorsoRepository.filterIdsInTenant(data.corsi, { ...this.options, transaction });

      const record = await CicloMonteOreRepository.create(data, {
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
        'cicloMonteOre',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.amministratoreMonteOre = await UserRepository.filterIdInTenant(data.amministratoreMonteOre, { ...this.options, transaction });
      data.studenti = await UserRepository.filterIdsInTenant(data.studenti, { ...this.options, transaction });
      data.corsi = await CorsoRepository.filterIdsInTenant(data.corsi, { ...this.options, transaction });

      const record = await CicloMonteOreRepository.update(
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
        'cicloMonteOre',
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
        await CicloMonteOreRepository.destroy(id, {
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
    return CicloMonteOreRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return CicloMonteOreRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return CicloMonteOreRepository.findAndCountAll(
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
    const count = await CicloMonteOreRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
