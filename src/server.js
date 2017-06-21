
export default ctx => (
  class LskUser {
    async init() {
      this.controller = this.getController();
    }

    getController() {
      return require('./controller').default(ctx, this);
    }

    async run() {
      ctx.app.use('/api/module/user', this.getApi());
    }

    getApi() {
      const api = ctx.asyncRouter();
      const { wrapResoursePoint } = ctx.helpers;
      api.use('/', wrapResoursePoint(this.controller));
      return api;
    }
  }
);
