// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Quran, Skills } = initSchema(schema);

export {
  Quran,
  Skills
};