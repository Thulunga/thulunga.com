// ============================================
// User types (shared across all subdomains)
// ============================================
export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  district?: string;     // e.g., "Kokrajhar", "Chirang", "Baksa", "Udalguri"
  community?: string;    // e.g., "Bodo", "Garo", "Assamese"
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Careers subdomain types
// ============================================
export type OpportunityType =
  | "government_exam"
  | "scholarship"
  | "job"
  | "internship"
  | "freelance"
  | "fellowship";

export type OpportunityCategory =
  | "engineering"
  | "medical"
  | "civil_services"
  | "teaching"
  | "arts_culture"
  | "business"
  | "technology"
  | "agriculture"
  | "legal"
  | "other";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  category: OpportunityCategory;
  organization: string;
  location?: string;
  url?: string;
  deadline?: Date;
  eligibility?: string;
  isRemote: boolean;
  isNortheastSpecific: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerPath {
  id: string;
  title: string;             // e.g., "Becoming a Civil Servant from Bodoland"
  slug: string;
  description: string;
  content: string;           // Markdown content for the guide
  targetAudience: string;    // e.g., "Class 12 students", "College graduates"
  estimatedDuration: string; // e.g., "2-3 years preparation"
  steps: CareerStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CareerStep {
  order: number;
  title: string;
  description: string;
}

// ============================================
// API response types
// ============================================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
}
