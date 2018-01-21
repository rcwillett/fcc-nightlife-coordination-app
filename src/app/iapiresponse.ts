import { IDestination } from './idestination';

export interface IAPIResponse {
    total: Number;
    businesses: IDestination[];
}