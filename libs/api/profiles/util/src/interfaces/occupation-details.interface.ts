import { HouseholdIncome, ProfileStatus } from '../enums';

export interface IOccupationDetails {
  householdIncome?: HouseholdIncome | null | undefined;
  occupation?: string | null | undefined;
  status?: ProfileStatus | null | undefined;
}
