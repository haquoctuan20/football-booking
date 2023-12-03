export interface FieldInterface {
  index: string;
  type: string;
}

export interface IField extends FieldInterface {
  id: string;
}

interface AddressFacility {
  number: string;
  street: string;
  ward: string;
  city: string;
}

export interface CreateFacility {
  name: string;
  address: AddressFacility;
  numOfFields: string;
  ownerId: string;
  fields: FieldInterface[];
}

export interface IFacility extends CreateFacility {
  id: string;
  rating?: number | string;
  comments?: any[];
}
