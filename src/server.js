import _ from 'lodash';

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

      api.all('/list', this.controller.list);
      api.all('/length', this.controller.length);
      api.all('/get', this.controller.get);
      api.all('/edit', this.controller.edit);
      api.all('/update', this.controller.update);


      return api;
    },
  }
);
