import { Endpoints as _endPoints } from '../dataService/endpoints';

export module sharedData_factories {

    export class SharedData {
        static $inject: string[] = ["$q", "$http"];
        public static injectionName: string = "SharedData";
        
        public newGrowthStagesCall: boolean = false;
        public grwthStages_2: boolean = false;
        public deferred: any;

        constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
            this.deferred = this.$q.defer();
            this.getDependencies();
        }

        public getFeatureFlagsNew() {

            var ffPromise = this.$q.defer();

            var allFeatureFlagCalls = [this.getMyFeatureFlags(), this.getDefaultFeatureFlags(), this.getBaseFeatureFlags()];

            this.$q.all(allFeatureFlagCalls)
                .then(function (responses: any) {
                    var r = {
                        'data': {
                            'UserFlags': responses[0].data.ResultSet,
                            'DefaultFlags': responses[1].data.ResultSet,
                            'BaseFlags': responses[2].data.ResultSet
                        }
                    };
                    ffPromise.resolve(r);

                });
            return ffPromise.promise;
        }

        public getBaseFeatureFlags() {
            return this.$http.get(_endPoints.baseFeatureFlags, { withCredentials: true });
        }

        public getMyFeatureFlags() {
            return this.$http.get(_endPoints.myFeatureFlags, { withCredentials: true });
        }

        public getDefaultFeatureFlags() {
            return this.$http.get(_endPoints.defaultFeatureFlags, { withCredentials: true });
        }

        public getPemissions() {
            var uri = _endPoints.UserPermissions;
            return this.$http.get(uri, { withCredentials: true });
        }

        public getFlagValue(currentFlag: any, flagName: string, response: any): boolean {
            var inUserEnabled = response.UserFlags.EnabledFlags && response.UserFlags.EnabledFlags.indexOf(flagName) != -1;
            var inUserDisabled = response.UserFlags.DisabledFlags && response.UserFlags.DisabledFlags.indexOf(flagName) != -1;
            var notInDefaultEnabled = response.DefaultFlags.EnabledFlags && response.DefaultFlags.EnabledFlags.indexOf(flagName) == -1;

            if (inUserEnabled) {
                return true;
            }

            if (inUserDisabled) {
                return false;
            }

            if (notInDefaultEnabled) {
                return false;
            }

            return true;
        }

        private getDependencies() {
            this.getFeatureFlagsNew().then((responseObject: any) => {
                var response = responseObject.data;
                for (var i in response.BaseFlags) {
                    var currentFlag: any = response.BaseFlags[i];
                    if (currentFlag.FeatureName == "Weather.NewGrowthStagesCall") {
                        this.newGrowthStagesCall = this.getFlagValue(currentFlag, "Weather.NewGrowthStagesCall", response);
                    }
                    if (currentFlag.FeatureName == "WE.growthStagesEndpoint_2") {
                        this.grwthStages_2 = this.getFlagValue(currentFlag, "WE.growthStagesEndpoint_2", response);
                    }
                }
                this.deferred.resolve();
            });
        };
    }
}
