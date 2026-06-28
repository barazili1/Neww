export enum AppScreen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  CONDITION = 'CONDITION',
  KEY_SCREEN = 'KEY_SCREEN',
  MAIN_PREDICTION = 'MAIN_PREDICTION',
}

export interface UserState {
  userId: string;
  activationKey: string;
  isActivated: boolean;
  platform: '1xbet' | 'melbet';
  subPlatform?: string;
  screenshotDeposit: string | null;
  screenshotPromocode: string | null;
  tasksCompleted: {
    telegram: boolean;
    youtube: boolean;
    install: boolean;
  };
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}
