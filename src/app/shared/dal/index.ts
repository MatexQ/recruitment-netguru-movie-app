import { IDal, IFindAll, IFindBy } from './interfaces';

const dal: IDal = {} as IDal;

const generateDal = (models: any) => {
  const modelsToOmit = ['sequelize', 'Sequelize'];

  Object.keys(models).forEach(modelName => {

    if (modelsToOmit.includes(modelName)) {
      return;
    }

    dal[modelName] = {
      async findAll(data: IFindAll) {
        return models[modelName].findAll({ ...data });
      },

      async create(data) {
        return models[modelName].create(data);
      },

      async findByPk(id: string) {
        return models[modelName].findByPk(id);
      },

      async findBy(data: IFindBy) {
        const { query, field, include } = data;

        return await models[modelName].findOne({
          ...query, where: { ...field }, include,
        });
      },
    };

  });
};

export { generateDal, dal };
