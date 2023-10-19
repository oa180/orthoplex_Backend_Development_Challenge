import Response from '../utils/response.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../middlewares/error/appError.js';
import prisma from '../../Database/prisma/prismClient.js';

class Crud {
  constructor(model) {
    if (!model) return new AppError('You must provide a model!', 400);
    this.model = model;
  }

  getAll = () =>
    catchAsync(async (req, res, next) => {
      const docs = await prisma.model.find(
        {},
        '-password -createdAt -changedAt'
      );

      if (!docs) return Response(res, `No ${this.Model.modelName}`, 200, {});

      Response(res, `${this.Model.modelName}`, 200, docs);
    });

  getOne = () =>
    catchAsync(async (req, res, next) => {
      const doc = await this.Model.findById(
        req.params.id,
        '-password -createdAt -changedAt'
      );

      if (!doc) return next(new AppError(`No ${this.Model.modelName} Found!`));

      Response(res, `${this.Model.modelName} Found.`, 200, doc);
    });

  createOne = () =>
    catchAsync(async (req, res, next) => {
      const { name, email, handler, password } = req.body;

      const doc = await prisma.model.create({
        data: { name, email, handler, password },
      });
      Response(res, `New ${this.Model.modelName} has been Created.`, 201, doc);
    });

  updateOne = () =>
    catchAsync(async (req, res, next) => {
      if (!this.customUpdateValidation(req, next)) return;

      let doc = await this.Model.findById(req.params.id);

      if (!doc) return next(new AppError(`No ${this.Model.modelName} Found!`));

      doc = (
        await this.Model.findByIdAndUpdate(doc._id, req.body, {
          new: true,
        })
      ).toObject();

      delete doc.password;
      delete doc.updatedAt;
      delete doc.createdAt;

      Response(res, `${this.Model.modelName} has been Updated.`, 200, doc);
    });

  deleteOne = () =>
    catchAsync(async (req, res, next) => {
      await this.Model.findByIdAndDelete(req.params.id);

      Response(res, `${this.Model.modelName} has been Deleted.`, 204);
    });
}
export default Crud;
