// todo check docs for type name
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
  addressComponents: any;
  coordinates: {
    x: number;
    y: number;
  };
  matchedAddress: string;
  tigerLine: any;
};
