export interface FieldInterface {
  index: string;
  type: string;
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
