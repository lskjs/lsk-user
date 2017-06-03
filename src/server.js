
export default ctx => (
  {
    async init() {
      // this.models = require('./models').default(ctx, this);
      this.controller = require('./controller').default(ctx, this);
    },

    async run() {
      ctx.app.use('/api/module/user', this.getApi());
    },

    getApi() {
      const api = ctx.asyncRouter();
      const { wrapResoursePoint } = ctx.helpers;

      api.use('/', wrapResoursePoint(this.controller));

      return api;
    },
  }
);
