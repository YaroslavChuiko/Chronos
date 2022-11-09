const ServerError = require('~/helpers/server-error');

const Factory = {
  async exists(model, where) {
    const found = await model.findUnique({ where });
    if (!found) {
      throw new ServerError(404, 'The entity does not exist.');
    }
    return found;
  },

  async findOne(model, id) {
    return model.findUnique({
      where: { id: Number(id) },
    });
  },

  async findMany(model, where, select) {
    return model.findMany({ where, select });
  },

  async create(model, data) {
    return model.create({ data });
  },

  async update(model, id, data) {
    return model.update({
      where: { id: Number(id) },
      data,
    });
  },

  async delete(model, id) {
    return model.delete({
      where: { id: Number(id) },
    });
  },
};

module.exports = Factory;
