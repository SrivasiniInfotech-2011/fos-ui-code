import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { utils, WorkBook, WorkSheet, writeFile } from 'xlsx';
import moment from 'moment';
import momentTz from 'moment-timezone';
import { DateFormat, FOSServiceDomain } from '../../../core/common/literals';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
/**
 * Service provider with common utilities for the system.
 */
export class UtilsService {
  /**
   * Constructor for initializing the dependencies
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Export a xlsx file when receiving a object and information of the file name and structure.
   *
   * @param data An Object containing the fields and content you want to save.
   * @param sheetName The name of the sheet on xlsx file.
   * @param fileName The name of the file that will be saved.
   *
   * @returns A boolean with the result of the operation.
   */
  exportToXLSX(data: object[], sheetName: string, fileName: string): boolean {
    if (data.length) {
      const workSheet: WorkSheet = utils.json_to_sheet(data);
      const workBook: WorkBook = utils.book_new();
      utils.book_append_sheet(workBook, workSheet, sheetName);
      writeFile(workBook, fileName);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Download xlsx
   * @param url
   * @param fileName
   */
  downloadStaticFile(url: string): void {
    window.open(url);
  }

  /**
   * Download file from API
   * @param endPoint
   * @param headers
   * @param payload
   * @param fileName
   */
  downloadFileFromApi<T>(endPoint: string, headers: HttpHeaders, payload: T, fileName: string): void {
    this.http.post(endPoint, payload, {
      headers,
      responseType: "blob" as "json"
    }).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      downloadLink.setAttribute('download', fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
    )
  };

  /**
   * convert date into utc format
   * @param date
   * @returns
   */
  convertDateToUTC(date: string) {
    return moment(date).utc().format(DateFormat.UTC_DATE_FORMAT.UTC_FORMAT)
  }

  /**
   * Convert UTC date to PDT Timezone.
   * @param date
   * @param timeZoneCode
   * @param dateFormatPDT
   * @returns
   */
  convertDateToConfiguredFormat(date: string, timeZoneCode: string, dateFormatPDT: string): string {
    return momentTz(date + "Z").tz(timeZoneCode).format(dateFormatPDT);
  }

  /**
   * Method to build the api endpoint depending on the micro service
   * @param domain
   * @param path
   * @param localPath
   */
  buildApiEndpoint(domain: string, path: string, localPath?: string | null): string {
    if (environment.loadConfigFromApi && domain.trim() && path.trim()) {
      return `${environment.apiBaseUrl.replace(FOSServiceDomain, domain)}${path}`;
    } else if (localPath?.trim()) {
      return `${environment.appBaseUrl}${localPath}`;
    } else {
      return "";
    }
  }

  /**
   * Convert any time to respective its equivalent pacific
   * @param date
   * @param dateTimeFormat
   */
  convertToPacificTime(date: string, timeZone: string): string {
    let currentTimeZoneDate = moment(date);
    let currentTimeZoneOffset = currentTimeZoneDate.utcOffset();
    let pacificOffset = moment().tz(timeZone).utcOffset();
    if (currentTimeZoneOffset == pacificOffset) {
      return date;
    }
    let totalOffset = currentTimeZoneOffset - pacificOffset;
    let relatedPacificDate = momentTz(moment(currentTimeZoneDate).add(totalOffset, 'm').toString()).tz(timeZone).toString();
    return relatedPacificDate;
  }
}
