const { AuthenticationError } = require('apollo-server-express');
const { UserData } = require('../models/index.js');
const { signToken } = require('../utils/auth.js');

const resolver = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await UserData.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('User is not logged in');
        }
    }
    , Mutation: {
        addUser: async (parent, args) => {
            const userInfo = await UserData.create(args);
            const token = signToken(userInfo);
            return { token, userInfo };
        }
        , login: async (parent, { email, password }) => {
            const userInfo = await UserData.findOne({ email });
            if (!userInfo) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPassword = await userInfo.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(userInfo);
            return { token, userInfo };
        }
        , saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedUser = await UserData.findByIdAndUpdate(
                    { _id: context.user._id }
                    , { $push: { savedBooks: bookData } }
                    , { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
        , removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await UserData.findOneAndUpdate(
                    { _id: context.user._id }
                    , { $pull: { savedBooks: { bookId } } }
                    , { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolver;