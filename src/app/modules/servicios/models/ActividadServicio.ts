export class ActividadServicio {
  activityDate: string;
  createdAt: string;
  description: number;
  duration: string;
  id: number;
  orderId: number;
  priorityName: string;
  priority: string;
  statusName: string;
  status: string;
  technicianId: number;

  constructor(data: any) {
    this.activityDate = data.activityDate;
    this.createdAt = data.createdAt;
    this.description = data.description;
    this.duration = data.duration;
    this.id = data.id;
    this.orderId = data.orderId;
    this.priorityName = data.priorityName;
    this.priority = data.priority;
    this.statusName = data.statusName;
    this.status = data.status;
    this.technicianId = data.technicianId;
  }
}
