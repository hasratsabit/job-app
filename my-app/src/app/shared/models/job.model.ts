export interface JobModel {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  creator: string;
  applicants: any[];
  jobViews: number;
  createdAt: Date;
}