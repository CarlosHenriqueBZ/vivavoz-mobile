export interface CreateComplaintRepositoryDTO {
  id?: string;
  type: string;
  status: number;
  company: string;
  city: string;
  syndicate: string;
  worker?: string;
  state: string;
  iscovid?: boolean;
  gotCovid?: string;
  gotCovidMore?: string;
  whereGotCovid?: number[];
  howManyGotCovid?: string;
  covidRisk?: number[];
}
