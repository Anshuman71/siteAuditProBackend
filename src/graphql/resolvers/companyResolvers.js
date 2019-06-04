import { UserInputError } from 'apollo-server';
import Company from '../../models/Company';
import { requireAuth } from '../../services/auth';

export default {
  getAllCompanies: async () => {
    try {
      const companies = await Company.find();
      return companies;
    } catch (error) {
      throw new Error("couldn't get Issues for you");
    }
  },
  getCompanyById: async (_, { _id }) => {
    try {
      const company = await Company.findById(_id)
        .populate('projectId')
        .exec();
      return company;
    } catch (error) {
      console.log({ error });
      throw new Error('problem finding Company!');
    }
  },
  createCompany: async (_, args, { user }) => {
    try {
      const company = await Company.create(args);
      return company;
    } catch (error) {
      console.log('create Company', { user }, { error });
      throw new Error('oops the Company fall of the stack!');
    }
  },
  updateCompany: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user);
      const company = await Company.findById({ _id });
      if (!company) {
        throw new UserInputError('requested Company not found!');
      }
      Object.entries(rest).forEach(([key, value]) => {
        company[key] = value;
      });
      return company.save();
    } catch (error) {
      throw error;
    }
  },
  deleteCompany: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const company = await Company.findById({ _id });

      if (!company) {
        throw new UserInputError('requested Company not found!');
      }
      await company.remove();
      return { message: 'Delete Success!' };
    } catch (error) {
      console.log('delete', { user }, { error });
      throw new Error("couldn't get the Company off stack!");
    }
  },
};
