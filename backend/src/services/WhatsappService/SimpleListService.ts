import Whatsapp from "../../models/Whatsapp";
import AppError from "../../errors/AppError";
import { FindOptions, Op } from "sequelize";

export interface SearchContactParams {
  companyId: string | number;
  name?: string;
}

const SimpleListService = async ({ name, companyId }: SearchContactParams): Promise<Whatsapp[]> => {
  let options: FindOptions = {
    order: [
      ['name', 'ASC']
    ]
  }

  if (name) {
    options.where = {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  }

  options.where = {
    ...options.where,
    companyId
  }

  const wpps = await Whatsapp.findAll(options);

  if (!wpps) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  return wpps;
};

export default SimpleListService;
