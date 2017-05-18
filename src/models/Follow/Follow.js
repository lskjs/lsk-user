import UniversalSchema from 'lego-starter-kit/utils/UniversalSchema';
export function getSchema(ctx) {
  const mongoose = ctx.db;
  const schema = new UniversalSchema({
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    followeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }, {
    model: 'Follow',
    collection: 'follow',
  });

  return schema;
}

export default(ctx) => {
  return getSchema(ctx).getMongooseModel(ctx.db);
};
