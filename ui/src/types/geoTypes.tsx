export type GeoResponse = {
  result: {
    addressMatches: AddressMatches[];
    input: {
      address: {
        address: string;
      };
      benchmark: any;
    };
  };
};

type AddressMatches = {
  addressComponents: {
    zip: string;
    streetName: string;
    preType: string;
    city: string;
    preDirection: string;
    suffixDirection: string;
    fromAddress: string;
    state: string;
    suffixType: string;
    toAddress: string;
    suffixQualifier: string;
    preQualifier: string;
  };
  coordinates: {
    x: number;
    y: number;
  };
  matchedAddress: string;
  tigerLine: any;
};
