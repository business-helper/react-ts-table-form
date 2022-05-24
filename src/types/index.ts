type Nullable<T> = T | null;

interface IItemType {
  prefix: string;
  id: number;
  name: string;
}

interface IItemAuthor {
  id: number;
  name: string;
}

interface IItemService {
  id: number;
  name: string;
}

interface IItemStatus {
  id: number;
  name: string;
}

interface IItemData {
  id: number;
  type: IItemType;
  number: string;
  summary: string;
  isPrivate: boolean;
  author: IItemAuthor;
  service: Nullable<IItemService>;
  status: IItemStatus;
  updatedOn: string;
  createdOn: string;
  nextReviewOn: Nullable<string>;
}

interface IEntity {
  data: IItemData;
  name: string;
}

interface ILink {
  name: string;
  displayName: string;
  href: string;
}

export interface IItem {
  entity: IEntity;
  links: ILink[];
}

export interface IForm {
  name: string;
  displayName: string;
  fieldsets: IFormFieldSet;
}

interface IFormFieldSet {
  displayName: string;
  fields: IFormField[];
}

interface IFormField {
  name: string;
  displayName: string;
  type: string;
  "x-options": IFormOption[];
}

interface IFormOption {
  value: any;
  text: string;
}
