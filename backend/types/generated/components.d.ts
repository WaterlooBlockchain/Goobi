import type { Schema, Attribute } from '@strapi/strapi';

export interface EmailsClaimed extends Schema.Component {
  collectionName: 'components_emails_claimeds';
  info: {
    displayName: 'claimed';
    icon: 'envelop';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'emails.claimed': EmailsClaimed;
    }
  }
}
