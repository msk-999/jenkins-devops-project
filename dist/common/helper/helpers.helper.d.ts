export default class Helpers {
    static sendResponse(status: number, data: any, err: any): any;
    static sendOk(data: any, message?: string): any;
    static sendCreated(data: any, message?: string): any;
    static sendUpated(data: any, message?: string): any;
    static sendDeleted(message?: string): any;
    static sendNotFound(message?: string): any;
    static sendNotAcceptable(message?: string): any;
    static sendAlreadyExist(message?: string): any;
    static sendBadRequest(err?: any): any;
    static hasNumber(str: string): boolean;
    static hasUpper(str: string): boolean;
    static hasLower(str: string): boolean;
    static hasSpecial(str: string): boolean;
    static hasSpace(str: string): boolean;
    static currentDate(): Date;
    static ucFirst(content: string): String;
    static toFixed(amount: number, decimal?: number): String;
}
