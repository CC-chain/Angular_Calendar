import { AnyObject } from "chart.js/types/basic";


export class DataCs {
  constructor(
    public id: string,
    public name: string,
    public backgroundColor: string,
    public color: string,
    public font: string,
    public margin: string,
    public width: string,
    public height: string,
    public padding: string,
    public backgroundImage: string,
  ) { }
}

export class CustomCs {
  constructor(
    public id: string | null,
    public name: string,
    public layout: string,
    public content: string,
    public script: string,
    public style: string,
    public targetComponent: string,
    public dependentComponents: string) { }
}

export class MetaTags {
  constructor(
    public price: string,
    public customer: string,
    public worker: string,
  ) { }
}


export class CalendarConfig {
  constructor(
    public id: string,
    public hourDuration: number,
    public hourSegmentHeight: number,
    public precision: string,
    public locale: string,
    public excludeDays: number[],
    public weekendDays: number[],
    public theme: {
      name: string,
      primary: string, secondary: string
    },
    public dayStartHour: number,
    public dayStartMinute: number,
    public dayEndHour: number,
    public dayEndMinute: number,
    public font: string,
  ) { }
}

export interface LoginContextInterface {
  username: string;
  email: string;
  password: string;
  token: string;
}


export class UserAuthentication {
  constructor(
    public token: string,
    public expiration: string,
    public userId: string,
    public userFullName: string,
    public siteId: string,
    public userRoles: string[]
  ) { }
}

export interface IData {
  data: any,
  message: string,
  success: boolean
}

export class Site {
  constructor(
    public id: number,
    public code: string,
    public phoneNumber: string,
    public email: string,
    public description: string,
    public address: string,
  ) { }
}

export interface CustomMetaInterface {
  siteServiceId?: number | any,
  userId?: number | any,
  userMessage: string,
  siteService?: SiteService,
  user?: User,
  isCancelled: boolean,
}

export interface SiteService {
  id?: number,
  name: string,
  breakAfter: boolean,
  breakAfterDuration?: number,
  color: string,
  price?: number,
  currency?: number,
  description: string,
  duration: number,
  images?: Image[],
}

export interface User {
  id: number,
  firstName: string,
  lastName: string,
  lastLoginDate: Date,
  phoneNumber: string
}

export interface Image {
  id: number,
  title: string,
  path: string,
}

export interface Employee {
  id?: number,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  password?: string,
  code?: string,
  email: string,
  gender: number,
  lastLoginDate?: Date,
}

export interface Role {
  id?: number,
  role: string,
}

export interface SiteServiceDay {
  id?: number,
  day: number,
  isHoliday: boolean,
  date: Date,
  siteServiceId: number,
}

export interface SiteOfTime {
  id?: number,
  day: number,
  isFullDay: boolean,
  date: any,
  endDate: any
}

export interface GetWeekSummary {
  completedReservationTotal: number,
  cancelledReservationTotal: number,
  siteServiceTotal: number,
  userTotal: number,
  maleTotal: number,
  femaleTotal: number,
  daySummary: DaySummary[],
  siteServiceSummary: SiteServiceSummary[]
}

export interface DaySummary {
  day: number,
  completedTotal: number,
  cancelledTotal: number
}

export interface SiteServiceSummary {
  siteServiceName: string,
  total: number
}

export interface GetMonthly {
  month: number,
  total: number
}
