// import User from '../User';
// import Users from './Users';
// import Settings from './Settings';
import User from './User';
import Users from './Users';
import Settings from './Settings';

export default {
  children: [
    {
      path: '/profile',
      async action({ page, user }) {
        return page
          .redirect(`/cabinet/user/${user._id}`);
      },
    },
    {
      path: '/user/:id',
      async action({ page, uapp }, { id }) {
        const user = await uapp.models.User.getById(id);
        // const { Messages } = uapp.modules.chat.components;
        return page
          .meta({
            title: 'Профиль пользователя',
            description: user.fullName,
            url: `/cabinet/user/${id}`,
          })
          .component(User, { user });
      },
    },
    {
      path: '/users',
      async action({ page, uapp }) {
        const users = new uapp.stores.Users();
        await users.fetchUsers(20);
        return page
          .meta({
            title: 'Список пользователей',
            description: 'Все пользователи',
            url: '/cabinet/users',
          })
          .component(Users, { users });
      },
    },
    {
      path: '/settings',
      async action({ page, uapp }) {
        const passports = await uapp.modules.auth.stores.Passports.getPassports();
        return page
          .meta({
            title: 'Профиль пользователя',
            description: 'Профиль пользователя',
            url: '/cabinet/profile',
          })
          .meta({
            title: 'Редактирование профиля',
            description: 'Старница настроек',
            url: '/cabinet/settings',
          })
          .component(Settings, { passports });
      },
    },
  ],
};
