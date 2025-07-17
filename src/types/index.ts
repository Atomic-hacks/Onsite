export interface Project {
  id: string;
  projectNumber: string;
  location: string;
  startDate: string;
  duration: number;
  type: string;
  description: string;
  title: string;
}

export interface LogEntry {
  id: string;
  type: 'Notes' | 'Work Done' | 'Issue';
  status: 'Non Issue' | 'Pending' | 'In-progress';
  description: string;
  dateCreated: string;
  createdBy: string;
  dateModified: string;
  modifiedBy: string;
}

export interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color?: 'green' | 'blue' | 'purple';
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}