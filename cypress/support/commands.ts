/// <reference path="./commands.d.ts" />

export type SystemStatistics = {
  users: number;
  farms: number;
  area: number;
  staff: number;
  animals: number;
  avgStaffAge: number;
  offers: number;
  totalValue: number;
  advanced: {
    avgAreaPerFarm: number;
    avgAnimalsPerFarm: number;
    avgStaffPerFarm: number;
    avgAnimalsPerStaff: number;
    avgOfferValue: number;
    completedTransactions: number;
    totalCompletedValue: number;
    totalActiveValue: number;
  };
};

export type RegisterUserData = {
  email: string;
  password: string;
  displayName?: string;
};

export type RegisterApiResponse<T = unknown> = {
  success: boolean;
  timestamp: string;
  data: T;
  message?: string;
  error?: string;
  details?: unknown;
};

Cypress.Commands.add('getSystemStatistics', () => {
  return cy
    .request<SystemStatistics>({
      method: 'GET',
      url: '/api/v1/statistics',
    })
    .its('body');
});

Cypress.Commands.add('registerUser', (user: RegisterUserData, aliasName = 'testUser') => {
  const body = {
    email: user.email,
    password: user.password,
    ...(user.displayName ? { displayedName: user.displayName } : {}),
  };

  return cy
    .request<RegisterApiResponse>({
      method: 'POST',
      url: '/api/v1/register',
      body,
    })
    .then((response) => {
      return cy
        .wrap(user)
        .as(aliasName)
        .then(() => response);
    });
});
