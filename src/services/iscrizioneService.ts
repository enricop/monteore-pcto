import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import IscrizioneRepository from '../database/repositories/iscrizioneRepository';
import CorsoFormazioneRepository from '../database/repositories/corsoFormazioneRepository';
import UserRepository from '../database/repositories/userRepository';
import EmailSender from '../services/emailSender';

const SEND_SUBSCRIPTION_EMAIL = true;

export default class IscrizioneService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studente = await UserRepository.filterIdInTenant(data.studente, { ...this.options, transaction });
      data.corso = await CorsoFormazioneRepository.filterIdInTenant(data.corso, { ...this.options, transaction });

      let emailsToAlert: Array<string> = [];
      const user = await UserRepository.findByIdWithoutAvatar(
        data.studente,
        this.options,
      );
      emailsToAlert.push(user.email);
      const course = await CorsoFormazioneRepository.findById(
        data.corso,
        this.options
      );


      const record = await IscrizioneRepository.create(data, {
        ...this.options,
        transaction,
      });

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      if (SEND_SUBSCRIPTION_EMAIL) {
        await this.sendAllSubscriptionEmails(emailsToAlert, course.nomeCorso);
      }

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'iscrizione',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction = await SequelizeRepository.createTransaction(
      this.options.database,
    );

    try {
      data.studente = await UserRepository.filterIdInTenant(data.studente, { ...this.options, transaction });
      data.corso = await CorsoFormazioneRepository.filterIdInTenant(data.corso, { ...this.options, transaction });

      const record = await IscrizioneRepository.update(
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
        'iscrizione',
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
        await IscrizioneRepository.destroy(id, {
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
    return IscrizioneRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return IscrizioneRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return IscrizioneRepository.findAndCountAll(
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
    const count = await IscrizioneRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }

  /**
   * Sends all deletion emails.
   */
  async sendAllSubscriptionEmails(emailsToAlert: Array<string>, courseName) {
    return Promise.all(
      emailsToAlert.map((emailToAlert) => {

        return new EmailSender(
          EmailSender.TEMPLATES.STUDENT_SUBSCRIPTION,
          { courseName: courseName }
        ).sendTo(emailToAlert);
      }),
    );
  }
}
