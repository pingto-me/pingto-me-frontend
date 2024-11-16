import { CommonPayloadMetaData } from './common';

export type IProfileItem = CommonPayloadMetaData & IProfileItemFormValue;

export type IProfileItemFormValue = {
  profileImage?: string;
  backgroundImage?: string;
  name: string;
  position: string;
  shortDescription?: string;
  icon: ProfileIconEnum;
};

export enum ProfileIconEnum {
  BADGES = 'badges',
  SKILLS = 'skills',
  NONE = 'none',
}
