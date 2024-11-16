export interface Card {
  cardName: string;
  code: string;
  pinCode: string;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  isRedeemed: boolean;
  id: string;
  eventId: string;
  event: Event;
  profile: any;
}

export interface CreatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt {
  _seconds: number;
  _nanoseconds: number;
}

export interface Event {
  isEnable: boolean;
  ownerId: string;
  createdAt: CreatedAt2;
  updatedAt: UpdatedAt2;
  id: string;
  eventType: string;
  name: string;
  description: string;
}

export interface CreatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}

export interface UpdatedAt2 {
  _seconds: number;
  _nanoseconds: number;
}
