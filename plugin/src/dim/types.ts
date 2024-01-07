export interface DimActions {
  refresh: () => void;

  toggleFarmingMode: () => void;

  selection: (params?: { type?: "item" | "loadout" }) => void;

  equipLoadout: (params: {
    loadout: string;
    character: string | "vault";
  }) => void;

  equipMaxPower: () => void;

  collectPostmaster: () => void;

  pullItem: (params: { itemId: string; equip: boolean }) => void;

  search: (params: {
    query: string;
    page: string;
    pullItems: boolean;
    sendToVault: boolean;
  }) => void;

  randomize: (params: { weaponsOnly: boolean }) => void;
}
