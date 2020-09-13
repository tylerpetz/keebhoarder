

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllUsers
// ====================================================

export interface getAllUsers_users_orders_items_images {
  url: string | null;
}

export interface getAllUsers_users_orders_items {
  images: (getAllUsers_users_orders_items_images | null)[] | null;
  name: string | null;
  description: string | null;
}

export interface getAllUsers_users_orders {
  id: number | null;
  trackingNumber: string | null;
  items: (getAllUsers_users_orders_items | null)[] | null;
}

export interface getAllUsers_users_inventory_item_images {
  url: string | null;
}

export interface getAllUsers_users_inventory_item {
  images: (getAllUsers_users_inventory_item_images | null)[] | null;
  name: string | null;
  description: string | null;
}

export interface getAllUsers_users_inventory {
  item: (getAllUsers_users_inventory_item | null)[] | null;
}

export interface getAllUsers_users {
  email: string;
  orders: (getAllUsers_users_orders | null)[] | null;        // A users orders
  inventory: (getAllUsers_users_inventory | null)[] | null;  // A users active inventory
}

export interface getAllUsers {
  users: (getAllUsers_users | null)[] | null;
}

export interface getAllUsersVariables {
  email?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================