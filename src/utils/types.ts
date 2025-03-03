
// Event Types
export enum EventType {
  WEDDING = "wedding",
  BIRTHDAY = "birthday",
  BARBECUE = "barbecue"
}

export interface Event {
  id: string;
  name: string;
  type: EventType;
  date: Date;
  time: string;
  location: string;
  description?: string;
  coverImage?: string;
  createdBy: string;
  createdAt: Date;
}

// Guest Types
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  rsvp?: boolean;
  role?: 'guest' | 'moderator' | 'organizer';
  notes?: string;
  createdAt: Date;
  eventType: EventType;
}

// Finance Types
export interface FinanceCategory {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface FinanceItem {
  id: string;
  name: string;
  amount: number;
  category: string;
  paid: boolean;
  dueDate?: Date;
  assignedTo?: string;
  notes?: string;
  createdAt: Date;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Navigation
export enum AppPage {
  HOME = "/",
  DASHBOARD = "/dashboard",
  GUESTS = "/guests",
  FINANCE = "/finance",
  INTERACTIONS = "/interactions",
  SETTINGS = "/settings"
}
