// import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto';

export default class Helpers {
  // static isValidEmailDomain = (email: string): boolean =>
  //   email.endsWith(APP_CONSTANT.EMAIL_DOMAIN);

  static sendResponse(status: number, data: any, err: any): any {
    throw new HttpException(
      {
        statusCode: status,
        data: data,
        message: err?.message ?? err,
      },
      status,
    );
  }

  static sendOk(
    data: any,
    message: string = 'Record Retrived Successfully',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendCreated(
    data: any,
    message: string = 'Record Created Successfully',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendUpated(
    data: any,
    message: string = 'Record Updated Successfully',
  ): any {
    return Helpers.sendResponse(HttpStatus.OK, data, message);
  }

  static sendDeleted(message: string = 'Record Deleted Successfully'): any {
    return Helpers.sendResponse(HttpStatus.OK, null, message);
  }

  static sendNotFound(message: string = 'Record Not Found'): any {
    return Helpers.sendResponse(HttpStatus.NOT_FOUND, null, message);
  }

  static sendNotAcceptable(message: string = 'Record Not Acceptable'): any {
    return Helpers.sendResponse(HttpStatus.NOT_ACCEPTABLE, null, message);
  }

  static sendAlreadyExist(message: string = 'Record already exists'): any {
    return Helpers.sendResponse(HttpStatus.NOT_ACCEPTABLE, null, message);
  }

  static sendBadRequest(err: any = 'Bad Request'): any {
    return Helpers.sendResponse(HttpStatus.BAD_REQUEST, null, err);
  }

  // static async encryptPassword(string: string): Promise<string> {
  //   return await bcrypt.hash(string, 10);
  // }

  static hasNumber(str: string): boolean {
    return /\d/.test(str);
  }

  static hasUpper(str: string): boolean {
    return /[A-Z]/.test(str);
  }

  static hasLower(str: string): boolean {
    return /[a-z]/.test(str);
  }

  static hasSpecial(str: string): boolean {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
  }

  static hasSpace(str: string): boolean {
    return /\s/.test(str);
  }

  static currentDate(): Date {
    return new Date();
  }

  static ucFirst(content: string): String {
    return content.charAt(0).toUpperCase() + content.slice(1);
  }

  static toFixed(amount: number, decimal: number = 2): String {
    return amount.toFixed(decimal);
  }
}
