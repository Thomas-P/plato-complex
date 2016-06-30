import {IReportSettings} from "../.interfaces/report/report-settings.interface";
/**
 * Created by ThomasP on 30.06.2016.
 */

export class Settings implements IReportSettings {
    tryCatch: boolean = false;
    forIn: boolean = false;
    logicalOr: boolean = false;
    switchCase: boolean = false;
    asPercentage: boolean = false;

    constructor() {

    }

}
