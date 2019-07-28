export interface Weather {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string;
  LocalSource: {
    Id: number,
    Name: string,
    WeatherCode: string,
  };
  IsDayTime: boolean;
  Temperature: {
    Metric: {
      Value: number,
      Unit: string,
      UnitType: number
    },
    Imperial: {
      Value: number,
      Unit: string,
      UnitType: number
    }
  };
  MobileLink: string;
  Link: string;
}

export interface FiveDayWeather {
  DailyForecasts: [{
    Date: string,
    Temperature: {
      Minimum: {
        Value: number,
        Unit: string,
        UnitType: number
      },
      Maximum: {
        Value: number,
        Unit: string,
        UnitType: number
      }
    },
    Day: {
      Icon: number,
      IconPhrase: string,
      HasPrecipitation: boolean,
      PrecipitationType: string,
      PrecipitationIntensity: string,
      LocalSource: {
        Id: number,
        Name: string,
        WeatherCode: string,
      }
    },
    Night: {
      Icon: number,
      IconPhrase: string,
      HasPrecipitation: boolean,
      PrecipitationType: string,
      PrecipitationIntensity: string,
      LocalSource: {
        Id: number,
        Name: string,
        WeatherCode: string,
      }
    },
    Sources: string[],
    MobileLink: string,
    Link: string,
  }];
}

export interface FiveDayHeadLine {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
};


