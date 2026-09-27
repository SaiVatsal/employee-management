import { create } from 'zustand';

export const useStore = create((set, get) => ({
  currentUser: {
    id: 'emp-104',
    name: 'David Vance',
    role: 'Senior Distributed Systems Engineer',
    department: 'Infrastructure & Cloud',
    email: 'david.vance@nexus.corp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    manager: 'Elena Rostova (VP of Engineering)',
    joiningDate: '2023-03-15',
    salary: '$165,000 / yr',
    leaveBalance: {
      vacation: 14,
      sick: 8,
      personal: 3
    }
  },

  isClockedIn: false,
  clockInTime: null,
  todaysHours: '7h 45m',

  employees: [
    {
      id: 'emp-101',
      name: 'Victoria Vance',
      role: 'Chief Executive Officer',
      department: 'Executive Leadership',
      email: 'victoria.vance@nexus.corp',
      status: 'Active',
      location: 'San Francisco HQ',
      directReports: ['Elena Rostova', 'Marcus Brody', 'Amara Thorne'],
      manager: null
    },
    {
      id: 'emp-102',
      name: 'Elena Rostova',
      role: 'VP of Engineering',
      department: 'Engineering',
      email: 'elena.rostova@nexus.corp',
      status: 'Active',
      location: 'San Francisco HQ',
      directReports: ['David Vance', 'Jordan Rivera', 'Chloe Ray'],
      manager: 'Victoria Vance'
    },
    {
      id: 'emp-103',
      name: 'Marcus Brody',
      role: 'Head of Product Strategy',
      department: 'Product & Design',
      email: 'marcus.brody@nexus.corp',
      status: 'Active',
      location: 'New York Office',
      directReports: ['Maya Lin', 'Sienna Ross'],
      manager: 'Victoria Vance'
    },
    {
      id: 'emp-104',
      name: 'David Vance',
      role: 'Senior Distributed Systems Engineer',
      department: 'Infrastructure & Cloud',
      email: 'david.vance@nexus.corp',
      status: 'Active',
      location: 'Remote (Seattle)',
      directReports: [],
      manager: 'Elena Rostova'
    },
    {
      id: 'emp-105',
      name: 'Jordan Rivera',
      role: 'Staff Frontend Architect',
      department: 'Frontend Experience',
      email: 'jordan.rivera@nexus.corp',
      status: 'On Leave',
      location: 'Austin Office',
      directReports: [],
      manager: 'Elena Rostova'
    }
  ],

  attendanceLogs: [
    { date: '2026-09-26', clockIn: '08:58 AM', clockOut: '05:32 PM', totalHours: '8.5 hrs', status: 'On Time' },
    { date: '2026-09-25', clockIn: '09:04 AM', clockOut: '05:45 PM', totalHours: '8.7 hrs', status: 'On Time' },
    { date: '2026-09-24', clockIn: '09:15 AM', clockOut: '05:30 PM', totalHours: '8.2 hrs', status: 'Late' },
    { date: '2026-09-23', clockIn: '08:52 AM', clockOut: '05:20 PM', totalHours: '8.4 hrs', status: 'On Time' }
  ],

  leaveRequests: [
    {
      id: 'lvr-1',
      employee: 'David Vance',
      type: 'Annual Vacation',
      startDate: '2026-10-18',
      endDate: '2026-10-22',
      days: 5,
      reason: 'Family reunion and travel',
      status: 'Approved',
      submittedOn: '2026-09-20'
    },
    {
      id: 'lvr-2',
      employee: 'Jordan Rivera',
      type: 'Medical Leave',
      startDate: '2026-09-26',
      endDate: '2026-09-29',
      days: 3,
      reason: 'Post-op recovery',
      status: 'Pending',
      submittedOn: '2026-09-25'
    }
  ],

  payslips: [
    {
      id: 'pay-2026-09',
      period: 'September 2026',
      baseSalary: 13750,
      taxDeduction: 3150,
      healthInsurance: 320,
      retirement401k: 825,
      netPay: 9455,
      payDate: '2026-09-30',
      status: 'Processed'
    },
    {
      id: 'pay-2026-08',
      period: 'August 2026',
      baseSalary: 13750,
      taxDeduction: 3150,
      healthInsurance: 320,
      retirement401k: 825,
      netPay: 9455,
      payDate: '2026-08-31',
      status: 'Paid'
    }
  ],

  performanceReviews: [
    {
      cycle: 'Q3 2026 Engineering Review',
      rating: '4.85 / 5.0 (Exceeds Expectations)',
      reviewer: 'Elena Rostova (VP of Engineering)',
      feedback: 'Outstanding leadership on the multi-region Kubernetes failover architecture. Delivered 99.999% uptime during peak loads.',
      goals: [
        { name: 'Zero-downtime database partition migration', progress: 100, status: 'Completed' },
        { name: 'Mentor 2 Junior SRE engineers on incident response', progress: 85, status: 'In Progress' }
      ]
    }
  ],

  // Actions
  toggleClock: () => set((state) => {
    if (!state.isClockedIn) {
      return {
        isClockedIn: true,
        clockInTime: '09:02 AM'
      };
    } else {
      const newLog = {
        date: '2026-09-27',
        clockIn: state.clockInTime || '09:00 AM',
        clockOut: '05:30 PM',
        totalHours: '8.5 hrs',
        status: 'On Time'
      };
      return {
        isClockedIn: false,
        clockInTime: null,
        attendanceLogs: [newLog, ...state.attendanceLogs]
      };
    }
  }),

  submitLeaveRequest: (request) => set((state) => ({
    leaveRequests: [
      {
        id: `lvr-${Date.now()}`,
        employee: state.currentUser.name,
        type: request.type,
        startDate: request.startDate,
        endDate: request.endDate,
        days: request.days,
        reason: request.reason,
        status: 'Pending',
        submittedOn: '2026-09-27'
      },
      ...state.leaveRequests
    ]
  })),

  updateLeaveStatus: (id, newStatus) => set((state) => ({
    leaveRequests: state.leaveRequests.map((r) =>
      r.id === id ? { ...r, status: newStatus } : r
    )
  }))
}));
