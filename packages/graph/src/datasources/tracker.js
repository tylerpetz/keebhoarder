const { RESTDataSource } = require('apollo-datasource-rest');
const tracker = require('delivery-tracker')
const courier = tracker.courier(tracker.COURIER.USPS.CODE)

class LaunchAPI extends RESTDataSource {
    constructor() {
        super();
    }

    async getDeliveryStatus(id) {
        courier.trace({ id }, function (err, result) {
            console.log(result)
            return result
        })
    }
}

module.exports = LaunchAPI;