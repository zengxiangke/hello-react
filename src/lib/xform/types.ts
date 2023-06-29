// field name: the name structure of a form field

type FieldNameBasic = string;
type FieldNameGroup = { type: 'group'; name: string; fields: FieldName };
type FieldNameTable = { type: 'table'; name: string; fields: FieldNameBasic };
type FieldName = FieldNameBasic | FieldNameGroup | FieldNameTable;
type CreateFieldNames<T extends FieldName> = T;

// field description

type FieldDescInput<TName = string> = {
  type: 'input';
  name: TName;
  required?: boolean;
  label: string;
  maxLength?: number;
};
type FieldDescSelect<TName = string> = {
  type: 'select';
  name: TName;
  required?: boolean;
  label: string;
  multiple?: boolean;
  getOptions: () => Promise<any[]>;
};
type FieldDescTable<
  TName = string,
  TFieldNames extends FieldName = FieldNameBasic
> = {
  type: 'table';
  name: TName;
  title: string;
  rowKey: TFieldNames;
  fields: FormFields<TFieldNames>;
};
type FieldDescGroup<
  TName = string,
  TFieldNames extends FieldName = FieldName
> = {
  type: 'group';
  name: TName;
  title: string;
  fields: FormFields<TFieldNames>;
  layout: (keyof FormFields<TFieldNames>)[][];
};

type FieldDesc = FieldDescBasic | FieldDescTable | FieldDescGroup;
type FieldDescBasic<TName = string> =
  | FieldDescInput<TName>
  | FieldDescSelect<TName>;

// form field

type FieldMapBasic<TNames extends FieldNameBasic> = {
  [K in TNames]: FieldDescBasic<K>;
};
type FieldMapGroup<TNames extends FieldNameGroup> = {
  [K in TNames as K['name']]: FieldDescGroup<K['name'], K['fields']>;
};
type FieldMapTable<TNames extends FieldNameTable> = {
  [K in TNames as K['name']]: FieldDescTable<K['name'], K['fields']>;
};
type FormFields<TNames extends FieldName> =
  // help format
  FieldMapBasic<Extract<TNames, FieldNameBasic>> &
    FieldMapGroup<Extract<TNames, FieldNameGroup>> &
    FieldMapTable<Extract<TNames, FieldNameTable>>;

// form schema

type FormSchema<Fields = object> = {
  title: string;
  fields: Fields;
  layout: (keyof Fields)[][];
};

// form values
type FormValuesBasic<T extends FieldNameBasic> = {
  [K in T]: any;
};
type FormValuesTable<T extends FieldNameTable> = {
  [K in T as K['name']]: Array<FormValuesBasic<K['fields']>>;
};
type FormValuesGroup<T extends FieldNameGroup> = {
  [K in T as K['name']]: FormValuesBasic<Extract<T['fields'], FieldNameBasic>> &
    FormValuesTable<Extract<T['fields'], FieldNameTable>> &
    FormValuesGroup<Extract<T['fields'], FieldNameGroup>>;
};
type FormValues<T extends FieldName> =
  // for format
  FormValuesBasic<Extract<T, FieldNameBasic>> &
    FormValuesTable<Extract<T, FieldNameTable>> &
    FormValuesGroup<Extract<T, FieldNameGroup>>;

export {
  FormValues,
  FormFields,
  FormSchema,
  CreateFieldNames,
  FieldDescBasic,
  FieldDescInput,
  FieldDescSelect,
  FieldDescTable,
  FieldDescGroup,
  FieldDesc,
  FieldName,
};
