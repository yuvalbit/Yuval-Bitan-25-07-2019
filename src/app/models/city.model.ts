export interface City {
  Key: string;
  LocalizedName: string;
  Rank: string;
  Type: string;
  Version: number;
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
  Country: {
    ID: string
    LocalizedName: string;
  };
}
