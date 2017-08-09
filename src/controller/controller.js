import _ from 'lodash';

export default (ctx) => {
  const { e404 } = ctx.errors;
  const controller = {};
  const { checkNotFound, createResourse, wrapResoursePoint } = ctx.helpers;

  // console.log({User}, User.findByParams);

  // const baseResourse = createResourse(User);
  const resourse = {
    // ...baseResourse,

    async list(req) {
      const { User } = ctx.models;
      const online = req.data.filter && req.data.filter.online || null;
      if (online != null) {
        delete req.data.filter.online;
      }

      const users = await User.findByParams(req.data);
      if (online != null) {
        return users.filter(user => user.online == online);
      }
      return users
    },

    //  async length () {
    //   const { User } = ctx.models;
    //   const count = await User.count({});
    //   return { count };
    // };

    async me(req) {
      const { User } = ctx.models;
      const user = await User.findOne({ _id: req.user._id });
      if (!user) throw e404('User not found!');
      return user;
    },

    async get(req) {
      const { User } = ctx.models;
      const criteria = req.data;

      const user = await User.findOne(criteria);
      if (!user) throw e404('User not found!');
      return user;
    },

    async update(req) {
      const { User } = ctx.models;
      const userId = req.user._id;
      if (!userId) throw e404('userId not found!');
      const params = req.data;

      const user = await User.findById(userId);
      if (!user) throw e404('User not found!');
      if (params.username) user.username = params.username;
      if (params.password) user.password = params.password;
      user.profile = _.merge({}, user.profile, params.profile);
      return user.save();
    },
    async edit(req) {
      const { User } = ctx.models;
      const userId = req.user._id;
      if (!userId) throw e404('userId not found!');
      const params = req.data;

      const user = await User.findById(userId);
      if (!user) throw e404('User not found!');
      if (params.username) user.username = params.username;
      if (params.password) user.password = params.password;
      _.merge(user.profile, params.profile);
      user.markModified('profile');
      return user.save();
    },
  };

  return resourse;
};
