import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class


  /**
   * The month view header week day labels
   */
   public override monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE', (locale ? locale : 'tr'));
  }

  /**
   * The month view cell day number
   */
  public override monthViewDayNumber({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'd', (locale ? locale : 'tr'));
  }

  /**
   * The month view title
   */
  public override monthViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'LLLL y', (locale ? locale : 'tr'));
  }

  /**
   * The week view header week day labels
   */
  public override weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE', (locale ? locale : 'tr'));
  }

  /**
   * The week view sub header day and month labels
   */
  public override weekViewColumnSubHeader({
    date,
    locale,
  }: DateFormatterParams): string {
    return formatDate(date, 'MMM d', (locale ? locale : 'tr'));
  }

  /**
   * The time formatting down the left hand side of the week view
   */
  public override weekViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, (locale == 'en-US' ? 'h:mm a' : 'HH:mm'), (locale ? locale : 'tr'));
  }

  /**
   * The time formatting down the left hand side of the day view
   */
  public override dayViewHour({ date, locale }: DateFormatterParams): string {
    return formatDate(date, (locale == 'en-US' ? 'h:mm a' : 'HH:mm'), (locale ? locale : 'tr'));
  }

  /**
   * The day view title
   */
  public override dayViewTitle({ date, locale }: DateFormatterParams): string {
    return formatDate(date, 'EEEE, MMMM d, y', (locale ? locale : 'tr'));
  }
}
