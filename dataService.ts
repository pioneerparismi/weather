import {Endpoints as _endPoints} from './endpoints';
import {MultiObsInputModel} from '../model/MultiObsInputModel'
import {sharedData_factories} from '../sharedData/sharedData'

export interface IDataService {
    getBusiness(businessKey: string) :ng.IPromise<{}>;
    getCropZones(fieldKey: string) :ng.IPromise<{}>;
    getDaily(latitude: number, longitude: number, startDate: string, endDate: string) :ng.IPromise<{}>;
    getDailyMultiple(observationData: Array<MultiObsInputModel>) :ng.IPromise<{}>;
    getFarm(farmKey: string) :ng.IPromise<{}>;
    getFarms(businessKey: string, year: number) :ng.IPromise<{}>;
    getField(fieldKey: string) :ng.IPromise<{}>;
    getFields(farmKey: string, year: number) :ng.IPromise<{}>;
    getFieldBoundary(field_key: string) :ng.IPromise<{}>;
    getFieldBoundaries(businessKey: string, year: number) :ng.IPromise<{}>;
    getNormal(latitude: number, longitude: number, startDate: string, endDate: string) :ng.IPromise<{}>;
    getNormalMultiple(observationData: Array<MultiObsInputModel>) :ng.IPromise<{}>;
    getGrowthStages(product_key: string, latitude: number, longitude: number, planting_date: string) :ng.IPromise<{}>;
    getPlantingStats(business_key: string, year: number): ng.IPromise<{}>;
    getWeatherCache(business_key: string) :ng.IPromise<{}>;
    updateWeatherCache(field_key: string) :ng.IPromise<{}>;
    submitFeedback(feedback: any): ng.IPromise<{}>;
    getUserProfile(): ng.IPromise<{}>;
    getCentroids(Fieldboundaries:any) :ng.IPromise<{}>;
    getNewNormal(observationData: Array<MultiObsInputModel>) :ng.IPromise<{}>;
    getNewDaily(observationData: Array<MultiObsInputModel>) :ng.IPromise<{}>;
    getSearchItems(): ng.IPromise<{}>;
    recordActivity(): ng.IPromise<{}>;
}

export class DataService implements IDataService {
    static $inject: string[] = ["$q", "$http", sharedData_factories.SharedData.injectionName ];
    public static injectionName: string = "DataService";

    constructor(private $q: ng.IQService, private $http: ng.IHttpService, private sharedData: sharedData_factories.SharedData) {

    }

    getBusiness(businessKey: string) {
        var uri = _endPoints.Businesses + '?business_key=' + businessKey;
        return this.$http.get(uri, {withCredentials: true});
    }

    getCropZones(fieldKey: string) {
        var uri = _endPoints.CropZones + '?field_key=' + fieldKey + '&limit=' + 9999;
        return this.$http.get(uri, {withCredentials: true});
    }

    getDaily(latitude: number, longitude: number, startDate: string, endDate: string) {
        var uri = _endPoints.Daily;
        var data = {
            "Latitude": latitude,
            "Longitude": longitude,
            "StartDate": startDate,
            "EndDate": endDate
        };
        return this.$http.post(uri, data, {withCredentials: true});
    }

    getDailyMultiple(observationData: Array<MultiObsInputModel>) {
        var uri = _endPoints.DailyMultiple;
        return this.$http.post(uri, observationData, {withCredentials: true});
    }

    getFarm(farmKey: string) {
        var uri = _endPoints.Farms + '/' + farmKey;
        return this.$http.get(uri, {withCredentials: true});
    }

    getFarms(businessKey: string, year: number) {
        var uri = _endPoints.Farms + '?business_key=' + businessKey + '&Years=' + year + '&limit=' + 9999;
        return this.$http.get(uri, {withCredentials: true});
    }

    getField(fieldKey: string) {
        var uri = _endPoints.Fields + '/' + fieldKey;
        return this.$http.get(uri, {withCredentials: true});
    }

    getFields(farmKey: string, year: number) {
        var uri = _endPoints.Fields + '?farm_key=' + farmKey  + '&Years=' + year + '&limit=' + 9999;
        return this.$http.get(uri, {withCredentials: true});
    }

    getFieldBoundary(fieldKey: string) {
        var uri = _endPoints.FieldBoundary + '?parent_key=' + fieldKey;
        return this.$http.get(uri, {withCredentials: true});
    }

    getFieldBoundaries(businessKey: string, year: number) {
        var uri = _endPoints.Fieldboundaries + businessKey + "/" + year + '?limit=' + 9999;
        return this.$http.get(uri, {withCredentials: true});
    }

    getGrowthStages(product_key: string, latitude: number, longitude: number, planting_date: string) {

        if (this.sharedData.grwthStages_2){
            var uri = _endPoints.GrowthStages2 + "?product_key=" + product_key + "&latitude=" + latitude + "&longitude=" + longitude + "&planting_date=" + planting_date + '&limit=' + 9999;
            return this.$http.get(uri, {withCredentials: true});
        }
        else{
            var uri = _endPoints.GrowthStages + "?product_key=" + product_key + "&latitude=" + latitude + "&longitude=" + longitude + "&planting_date=" + planting_date + '&limit=' + 9999;
            return this.$http.get(uri, {withCredentials: true});
        }
        
     }
 
     

    getNormal(latitude: number, longitude: number, startDate: string, endDate: string) {
        var uri = _endPoints.Normal;
        var data = {
            "Latitude": latitude,
            "Longitude": longitude,
            "StartDate": startDate,
            "EndDate": endDate
        };
        return this.$http.post(uri, data, {withCredentials: true});
    }

    getNormalMultiple(observationData: Array<MultiObsInputModel>) {
        var uri = _endPoints.NormalMultiple;
        return this.$http.post(uri, observationData, {withCredentials: true});
    }

    getPlantingStats(business_key: string, year: number) {
        var uri = _endPoints.plantingSummaryStats + "/" + business_key + "/" + year;
        return this.$http.get(uri, {withCredentials: true});
    }

    getWeatherCache(business_key: string) {
        var uri = _endPoints.WeatherCache + "/" + business_key + '?limit=' + 9999;
        return this.$http.get(uri, {withCredentials: true});
    }

    getUserProfile() {
        var uri = _endPoints.userProfile;
        return this.$http.get(uri, { withCredentials: true });
    }

    updateWeatherCache(field_key: string){
        var uri = _endPoints.WeatherCache + "/update/" + field_key;
        return this.$http.get(uri, {withCredentials: true});
    }

    submitFeedback(feedback: any) {
        var uri = _endPoints.feedback;
        return this.$http.post(uri, feedback, { withCredentials: true });
    }

    getCentroids(Fieldboundaries:any){
        var uri = _endPoints.centroids;
        var fieldData:any = [];
        for(var f in Fieldboundaries){
            var field = Fieldboundaries[f];
            var fieldToAdd = {
                "FieldKey": field.parentKey,
                "Geom": JSON.stringify(field.geom)
            }
            fieldData.push(fieldToAdd);
        }

        var data = {
            "Fields": fieldData
        }

        return this.$http.post(uri, data, {withCredentials: true});
    }

    getNewDaily(observationData: Array<MultiObsInputModel>) {
        var uri = _endPoints.NewDaily;
        
        return this.$http.post(uri, observationData, {withCredentials: true});
    }

    getNewNormal(observationData: Array<MultiObsInputModel>) {
        var uri = _endPoints.NewNormal;
        
        return this.$http.post(uri, observationData, {withCredentials: true});
    }

    getSearchItems() {
        var uri = _endPoints.SearchItems;

        return this.$http.get(uri, {withCredentials: true});
    }

    recordActivity(){
        var uri = _endPoints.activityRecord;
        var payload = '{ "activity":"view", "app_area":"optiplanner" }';
        return this.$http.post(uri, payload, { withCredentials: true });
    }

     getShowTourFlag() {
         //parse response for value
        return this.$http.get(_endPoints.preferences+'/WeatherExplorerTour', { withCredentials: true });
    }

    setTourViewedFlag(status: number) {
        var uri = _endPoints.preferences + '/WeatherExplorerTour';
        return this.$http.put(uri, status, { withCredentials: true });
    }

    getOpSummary(businessKey: string, year: number) {
        var uri = _endPoints.opSummary + '/' + businessKey + '/' + year;
        return this.$http.get(uri, {withCredentials: true});
    }
}