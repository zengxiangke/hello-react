import { CreateFieldNames, FormFields, FormSchema, FormValues } from './types';

/**
 * A student form with fields:
 *  name, age, gender, school(name, address)
 */
function Basic() {
  type Names = CreateFieldNames<
    | 'name'
    | 'gender'
    | { type: 'group'; name: 'school'; fields: 'name' | 'address' }
  >;

  type Fields = FormFields<Names>;

  const form: FormSchema<Fields> = {
    title: 'Student Form',
    layout: [
      ['name', 'gender'],
      ['school', 'school'],
    ],
    fields: {
      name: {
        name: 'name',
        type: 'input',
        label: 'Name',
      },
      gender: {
        name: 'gender',
        type: 'input',
        label: 'Gender',
      },
      school: {
        name: 'school',
        title: 'School Info',
        type: 'group',
        layout: [['name'], ['address']],
        fields: {
          name: {
            name: 'name',
            type: 'input',
            label: 'School Name',
          },
          address: {
            name: 'address',
            type: 'input',
            label: 'School Address',
          },
        },
      },
    },
  };

  const student = {
    name: 'Alice',
    gender: 'Male',
    school: {
      name: 'Harvard',
      address: 'New york',
    },
  } satisfies FormValues<Names>;
}
