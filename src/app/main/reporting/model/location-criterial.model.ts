
export class LocationCriterial {
    province: number;
    districts: number[];
    years: [];



    constructor(locationCriterial?) {
        locationCriterial = locationCriterial || {};
        this.province = locationCriterial.province || 1;
        this.districts = locationCriterial.districts || [];
        this.years = locationCriterial.years || [];
    }
}