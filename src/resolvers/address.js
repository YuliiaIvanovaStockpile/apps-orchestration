export class Address {
  constructor(address1, address2, city, state, zip, country){
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.country = country;
  }
}

export class AddressInput extends Address {
  constructor(address1, address2, city, state, zip, country){
    super(address1, address2, city, state, zip, country);
  }
}


