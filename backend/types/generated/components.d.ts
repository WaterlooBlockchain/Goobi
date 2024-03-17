import type { Schema, Attribute } from '@strapi/strapi';

export interface EmailsClaimed extends Schema.Component {
  collectionName: 'components_emails_claimeds';
  info: {
    displayName: 'claimed';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    amount: Attribute.Integer;
  };
}

export interface EmailsVerification extends Schema.Component {
  collectionName: 'components_emails_verifications';
  info: {
    displayName: 'verified';
    description: '';
  };
  attributes: {
    user: Attribute.Relation<
      'emails.verification',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    code: Attribute.Integer & Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'emails.claimed': EmailsClaimed;
      'emails.verification': EmailsVerification;
    }
  }
}
