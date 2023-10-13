import type { ComponentProps, ComponentType, SvelteComponent } from 'svelte';
import type { Actor5e, Actor5eHp } from './actor';
import type { Item5e, ItemCardContentComponent } from './item';

// TODO: Make this generic in such a way that correct props are actually required and that an array of tabs can have hetergeneity of component types without a crazy TS type
export type Tab<
  T extends SvelteComponent<any, any, any> = SvelteComponent<any, any, any>
> = {
  id: string;
  displayName: string;
  content: {
    component: ComponentType<T>;
    props?: ComponentProps<T>;
    cssClass?: string;
  };
};

export type ClassSummary = {
  class?: string;
  subclass?: string;
  level?: string;
};

export type ItemCardStore = {
  item: Item5e | null;
  itemCardContentTemplate: ItemCardContentComponent | null;
  sheet: HTMLElement;
};

export type CharacterSheetContext = {
  resources: Resource[];
  skills: ActorContextSkills;
  tools: ActorContextTools;
  hp: Actor5eHp;
  allowMaxHpOverride: boolean;
} & ActorSheetContext &
  JQueryHooksSheetIntegration &
  Record<string, any>;

export type NpcSheetContext = {
  encumbrance: any
} & ActorSheetContext &
  JQueryHooksSheetIntegration &
  Record<string, any>;

export type VehicleSheetContext = {} & ActorSheetContext &
  JQueryHooksSheetIntegration &
  Record<string, any>;

export type ActorSheetContext = {
  appId: string;
  actor: Actor5e;
  lockSensitiveFields: boolean;
  editable: boolean;
  allowEffectsManagement: boolean;
  lockMoneyChanges: boolean;
  lockExpChanges: boolean;
  lockHpMaxChanges: boolean;
  lockLevelSelector: boolean;
  /**
   * Item Quantity should be uneditable.
   */
  lockItemQuantity: boolean;
  /**
   * The current user owns the actor.
   */
  owner: boolean;
  showLimitedSheet: boolean;
  useRoundedPortraitStyle: boolean;
  classicControlsEnabled: boolean;
};

export type JQueryHooksSheetIntegration = {
  activateFoundryJQueryListeners: (html: HTMLElement) => Promise<void>;
};

export interface Resource {
  value: number;
  max: number;
  sr: boolean;
  lr: boolean;
  label: string;
  name: string;
  placeholder: string;
}

export interface ActorContextSkills {
  acr: ActorContextSkill;
  ani: ActorContextSkill;
  arc: ActorContextSkill;
  ath: ActorContextSkill;
  dec: ActorContextSkill;
  his: ActorContextSkill;
  ins: ActorContextSkill;
  itm: ActorContextSkill;
  inv: ActorContextSkill;
  med: ActorContextSkill;
  nat: ActorContextSkill;
  prc: ActorContextSkill;
  prf: ActorContextSkill;
  per: ActorContextSkill;
  rel: ActorContextSkill;
  slt: ActorContextSkill;
  ste: ActorContextSkill;
  sur: ActorContextSkill;
}

export type ActorContextTools = Actor5e;

export interface ActorContextSkill {
  value: number;
  ability: string;
  bonuses: ActorContextSkillBonuses;
  bonus: number;
  mod: number;
  prof: ActorContextSkillProficiency;
  proficient: number;
  total: number;
  passive: number;
  abbreviation: string;
  icon: string;
  hover: string;
  label: string;
  baseValue: number;
}

export interface ActorContextSkillBonuses {
  check: string;
  passive: string;
}

export interface ActorContextSkillProficiency {
  _baseProficiency: number;
  multiplier: number;
  rounding: string;
}

export type TidyDropdownOption = { value: any; text: string };

export type PortraitCharmRadiusClass =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'rounded';

export type ItemLayoutMode = 'grid' | 'list';

export type DropdownOption = { text: string; value: string };

export type globalThisUI = {
  notifications: ClientNotifications;
};

type ClientNotifications = {
  error(message: string, options?: Partial<NotifyOptions>): void;
  info(message: string, options?: Partial<NotifyOptions>): void;
  warn(message: string, options?: Partial<NotifyOptions>): void;
};

type NotifyOptions = {
  permanent: boolean;
  localize: boolean;
  console: boolean;
};

export type D20Roll = Roll & {
  // TODO: Populate if needed
};

export type Roll = {
  // TODO: Populate if needed
};

export type SheetStats = {
  lastSubmissionTime: Date | null;
};

export type CargoOrCrewItem = { name: string; quantity: number };

export type GetFunctionReturnType<T> = T extends {
  get: () => infer V;
}
  ? V
  : never;
