import React, { useState } from 'react';
import {
  Building2,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Award,
  Network,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Plus,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  AlertTriangle,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useStore } from './store/useStore';

export default function App() {
  const {
    currentUser,
    isClockedIn,
    clockInTime,
    employees,
    attendanceLogs,
    leaveRequests,
    payslips,
    performanceReviews,
    toggleClock,
    submitLeaveRequest,
    updateLeaveStatus
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchEmp, setSearchEmp] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  // Leave Form State
  const [leaveType, setLeaveType] = useState('Annual Vacation');
  const [leaveStart, setLeaveStart] = useState('2026-10-10');
  const [leaveEnd, setLeaveEnd] = useState('2026-10-14');
  const [leaveDays, setLeaveDays] = useState(5);
  const [leaveReason, setLeaveReason] = useState('');

  const departments = ['All', 'Executive Leadership', 'Engineering', 'Product & Design', 'Infrastructure & Cloud', 'Frontend Experience'];

  const filteredEmployees = employees.filter((emp) => {
    const matchesQuery = emp.name.toLowerCase().includes(searchEmp.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchEmp.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchEmp.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesQuery && matchesDept;
  });

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    submitLeaveRequest({
      type: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      days: Number(leaveDays),
      reason: leaveReason
    });
    setLeaveReason('');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col justify-between">
      {/* Top Enterprise Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block leading-none">
                NEXUS CORP
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 font-semibold">
                HR & Human Capital Suite
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="hidden lg:flex items-center gap-1 bg-[#1e293b] p-1 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'directory' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Directory ({employees.length})
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'attendance' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Attendance
            </button>
            <button
              onClick={() => setActiveTab('leaves')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'leaves' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Leave Management
            </button>
            <button
              onClick={() => setActiveTab('payslips')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'payslips' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Payroll & Payslips
            </button>
            <button
              onClick={() => setActiveTab('org-chart')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'org-chart' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Org Chart
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'performance' ? 'bg-blue-600 text-white font-bold' : 'hover:text-white'}`}
            >
              Reviews
            </button>
          </div>

          {/* Clock In/Out Fast Action + Profile */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleClock}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md ${
                isClockedIn
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              {isClockedIn ? `Clock Out (${clockInTime})` : 'Clock In Now'}
            </button>

            <div className="hidden sm:block text-right">
              <span className="text-xs font-bold text-white block leading-tight">{currentUser.name}</span>
              <span className="text-[10px] text-slate-400">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {/* VIEW 1: SELF-SERVICE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top Banner */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-bold">
                  Self-Service Portal // Employee #{currentUser.id}
                </span>
                <h1 className="text-2xl font-black text-white mt-1">Welcome back, {currentUser.name}</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Department: <strong className="text-slate-200">{currentUser.department}</strong> • Manager: <strong className="text-slate-200">{currentUser.manager}</strong>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="bg-[#0f172a] border border-slate-800 p-3.5 rounded-xl text-center min-w-[110px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Vacation Left</span>
                  <div className="text-xl font-black text-blue-400 mt-0.5">{currentUser.leaveBalance.vacation} Days</div>
                </div>
                <div className="bg-[#0f172a] border border-slate-800 p-3.5 rounded-xl text-center min-w-[110px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Sick Leave</span>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">{currentUser.leaveBalance.sick} Days</div>
                </div>
                <div className="bg-[#0f172a] border border-slate-800 p-3.5 rounded-xl text-center min-w-[110px]">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Latest Net Pay</span>
                  <div className="text-xl font-black text-amber-400 mt-0.5 font-mono-num">${payslips[0].netPay}</div>
                </div>
              </div>
            </div>

            {/* Grid Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quick Actions & Attendance Card */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Time & Attendance Status
                </h3>
                <div className="p-4 bg-[#0f172a] rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Current Workstation Status</span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {isClockedIn ? `Active Shift (Started ${clockInTime})` : 'Offline / Off Shift'}
                    </h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${isClockedIn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'}`}>
                    {isClockedIn ? 'CLOCKED IN' : 'OFFLINE'}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Recent Shift Logs</span>
                  {attendanceLogs.slice(0, 3).map((log, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2.5 bg-[#0f172a]/60 rounded-lg border border-slate-800/80">
                      <span className="font-mono text-slate-300">{log.date}</span>
                      <span className="text-slate-400">{log.clockIn} - {log.clockOut}</span>
                      <span className="font-bold text-emerald-400">{log.totalHours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Approvals & Performance Card */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-400" /> Performance & Goals Pulse
                </h3>
                <div className="p-4 bg-[#0f172a] rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">{performanceReviews[0].cycle}</span>
                    <span className="text-xs font-black text-blue-400">{performanceReviews[0].rating}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed italic">
                    "{performanceReviews[0].feedback}"
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase">Active Quarterly Objectives</span>
                  {performanceReviews[0].goals.map((g, i) => (
                    <div key={i} className="p-3 bg-[#0f172a]/60 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-200">{g.name}</span>
                        <span className="font-mono text-blue-400">{g.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${g.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: EMPLOYEE DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Enterprise Personnel Directory</h2>
                <p className="text-xs text-slate-400">Searchable repository of active talent, department heads & reporting lines</p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search name, role or email..."
                    value={searchEmp}
                    onChange={(e) => setSearchEmp(e.target.value)}
                    className="bg-[#1e293b] border border-slate-700 text-xs text-white pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>
                <select
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                  className="bg-[#1e293b] border border-slate-700 text-xs text-white px-3 py-2 rounded-xl focus:outline-none focus:border-blue-500"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table-First Structured Data Layout */}
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 border-b border-slate-800 uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-4">Employee</th>
                    <th className="p-4">Title & Department</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Manager</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium text-slate-300">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{emp.name}</div>
                        <div className="text-[11px] text-slate-400">{emp.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-200 font-semibold">{emp.role}</div>
                        <span className="text-[10px] text-blue-400 uppercase font-mono">{emp.department}</span>
                      </td>
                      <td className="p-4 text-slate-400">{emp.location}</td>
                      <td className="p-4 text-slate-300">{emp.manager || '— (Direct to Board)'}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          emp.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => alert(`Viewing personnel record for ${emp.name}`)}
                          className="px-3 py-1.5 bg-[#0f172a] hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
                        >
                          View File
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 3: ATTENDANCE & TIME TRACKING */}
        {activeTab === 'attendance' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div>
                <h2 className="text-xl font-bold text-white">Biometric & Shift Attendance Log</h2>
                <p className="text-xs text-slate-400">Daily clock-in/out timestamps and compliance tracking</p>
              </div>
              <button
                onClick={toggleClock}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  isClockedIn ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                {isClockedIn ? 'Confirm Clock Out' : 'Confirm Clock In'}
              </button>
            </div>

            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a] text-slate-400 border-b border-slate-800 uppercase font-mono">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Clock-In</th>
                    <th className="p-4">Clock-Out</th>
                    <th className="p-4">Logged Duration</th>
                    <th className="p-4">Punctuality Signal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-medium text-slate-300">
                  {attendanceLogs.map((log, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-white">{log.date}</td>
                      <td className="p-4 text-slate-300">{log.clockIn}</td>
                      <td className="p-4 text-slate-300">{log.clockOut}</td>
                      <td className="p-4 font-mono-num font-bold text-emerald-400">{log.totalHours}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'On Time' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: LEAVE REQUESTS */}
        {activeTab === 'leaves' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Submission Form */}
              <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" /> Submit Time-Off Request
                </h3>
                <form onSubmit={handleLeaveSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Leave Classification</label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Annual Vacation">Annual Vacation</option>
                      <option value="Medical Leave">Medical Leave</option>
                      <option value="Personal / Bereavement">Personal / Bereavement</option>
                      <option value="Parental Leave">Parental Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={leaveStart}
                        onChange={(e) => setLeaveStart(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">End Date</label>
                      <input
                        type="date"
                        value={leaveEnd}
                        onChange={(e) => setLeaveEnd(e.target.value)}
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Total Days</label>
                    <input
                      type="number"
                      value={leaveDays}
                      onChange={(e) => setLeaveDays(e.target.value)}
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Business Reason</label>
                    <textarea
                      rows={2}
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      placeholder="Brief context for approving manager..."
                      className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20"
                  >
                    Submit for Approval
                  </button>
                </form>
              </div>

              {/* Requests Queue */}
              <div className="lg:col-span-2 bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Leave Approval Workflow Queue</h3>
                <div className="space-y-3">
                  {leaveRequests.map((req) => (
                    <div key={req.id} className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs">{req.employee}</span>
                          <span className="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded border border-blue-700">{req.type}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          {req.startDate} to {req.endDate} ({req.days} days) • Reason: {req.reason}
                        </p>
                        <span className="text-[10px] text-slate-500 font-mono">Submitted: {req.submittedOn}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => updateLeaveStatus(req.id, 'Approved')}
                              className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg text-xs font-bold border border-emerald-500/30 transition flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button
                              onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                              className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded-lg text-xs font-bold border border-rose-500/30 transition flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          </>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            req.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {req.status}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: PAYSLIPS & COMPENSATION */}
        {activeTab === 'payslips' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div>
                <h2 className="text-xl font-bold text-white">Salary Records & Generated Payslips</h2>
                <p className="text-xs text-slate-400">Automated payroll slips with tax withholding, 401(k), and direct deposit logs</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400">Annual Base Package</span>
                <div className="text-xl font-black text-blue-400 font-mono-num">{currentUser.salary}</div>
              </div>
            </div>

            <div className="space-y-4">
              {payslips.map((slip) => (
                <div key={slip.id} className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-bold text-white text-base">Payslip Period: {slip.period}</h3>
                      <span className="text-[11px] text-slate-400 font-mono">Disbursement Date: {slip.payDate} • #{slip.id}</span>
                    </div>
                    <button
                      onClick={() => alert(`Exporting simulated official Payslip PDF for ${slip.period}`)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF Slip
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#0f172a] p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">Gross Earnings</span>
                      <div className="text-base font-bold text-white mt-0.5 font-mono-num">${slip.baseSalary.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-rose-400 font-mono">Tax Withholding</span>
                      <div className="text-base font-bold text-rose-400 mt-0.5 font-mono-num">-${slip.taxDeduction.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-slate-400 font-mono">401(k) / Healthcare</span>
                      <div className="text-base font-bold text-slate-300 mt-0.5 font-mono-num">-${(slip.healthInsurance + slip.retirement401k).toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-emerald-400 font-mono font-bold">Net Deposit</span>
                      <div className="text-lg font-black text-emerald-400 mt-0.5 font-mono-num">${slip.netPay.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 6: ORG CHART */}
        {activeTab === 'org-chart' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white">Hierarchical Organizational Architecture</h2>
              <p className="text-xs text-slate-400 mt-0.5">Corporate chain of command, executive leadership, and departmental nodes</p>

              {/* Org Chart Visualization Tree */}
              <div className="mt-8 flex flex-col items-center space-y-6">
                {/* CEO Node */}
                <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-900 border-2 border-blue-500 rounded-2xl text-center shadow-xl w-64">
                  <span className="text-[10px] font-mono uppercase text-blue-300 font-bold">Executive Office</span>
                  <h4 className="font-bold text-white text-sm mt-0.5">Victoria Vance</h4>
                  <p className="text-[11px] text-slate-300">Chief Executive Officer</p>
                </div>

                <div className="w-0.5 h-6 bg-blue-600" />

                {/* VP Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                  <div className="p-4 bg-[#0f172a] border border-blue-500/50 rounded-2xl text-center shadow-lg">
                    <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">Engineering Org</span>
                    <h4 className="font-bold text-white text-sm mt-0.5">Elena Rostova</h4>
                    <p className="text-[11px] text-slate-400">VP of Engineering</p>
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div>↳ David Vance (Sr Distributed Systems)</div>
                      <div>↳ Jordan Rivera (Staff Frontend)</div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#0f172a] border border-slate-700 rounded-2xl text-center shadow-lg">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Product Org</span>
                    <h4 className="font-bold text-white text-sm mt-0.5">Marcus Brody</h4>
                    <p className="text-[11px] text-slate-400">Head of Product Strategy</p>
                    <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div>↳ Maya Lin (Sr UX Strategist)</div>
                      <div>↳ Sienna Ross (Principal Designer)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: PERFORMANCE REVIEWS */}
        {activeTab === 'performance' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-[#1e293b] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Performance Calibration & Appraisals</h2>
                <p className="text-xs text-slate-400">Quarterly competency scorecards, OKR delivery benchmarks, and executive remarks</p>
              </div>

              {performanceReviews.map((rev, i) => (
                <div key={i} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-blue-400 font-bold">{rev.cycle}</span>
                      <h3 className="font-bold text-white text-base">Comprehensive Appraisal</h3>
                    </div>
                    <span className="px-3 py-1 bg-blue-900/60 text-blue-300 border border-blue-700 rounded-full text-xs font-bold">
                      {rev.rating}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Reviewer Assessment by {rev.reviewer}</span>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-[#1e293b]/60 p-4 rounded-xl border border-slate-800">
                      "{rev.feedback}"
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Key Result Objectives</span>
                    {rev.goals.map((g, idx) => (
                      <div key={idx} className="bg-[#1e293b]/80 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h5 className="font-bold text-xs text-white">{g.name}</h5>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${g.progress}%` }} />
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-blue-400 flex-shrink-0">{g.progress}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-800 bg-[#0f172a] py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 NEXUS CORP ENTERPRISE HR. SUPABASE / POSTGRESQL RELATIONAL HUMAN CAPITAL SCHEMA.
      </footer>
    </div>
  );
}
