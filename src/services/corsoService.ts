import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import CorsoRepository from '../database/repositories/corsoRepository';
import UserRepository from '../database/repositories/userRepository';

export default class CorsoService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studentiIscritti = await UserRepository.filterIdsInTenant(data.studentiIscritti, { ...this.options, transaction });
      data.studentiAmmessi = await UserRepository.filterIdsInTenant(data.studentiAmmessi, { ...this.options, transaction });

      const record = await CorsoRepository.create(data, {
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
        'corso',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studentiIscritti = await UserRepository.filterIdsInTenant(data.studentiIscritti, { ...this.options, transaction });
      data.studentiAmmessi = await UserRepository.filterIdsInTenant(data.studentiAmmessi, { ...this.options, transaction });

      const record = await CorsoRepository.update(
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
        'corso',
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
        await CorsoRepository.destroy(id, {
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
    return CorsoRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return CorsoRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return CorsoRepository.findAndCountAll(
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
    const count = await CorsoRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
