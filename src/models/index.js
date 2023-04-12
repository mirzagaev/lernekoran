// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Quran, Skills, QuranSkills } = initSchema(schema);

export {
  Quran,
  Skills,
  QuranSkills
};