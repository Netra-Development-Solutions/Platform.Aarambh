const { DomainModelEngine } = require('@nds/domain-model-engine');

engineInstance = new DomainModelEngine()
engineInstance.convertToMongooseSchema("Domain", {
    "firstName": {
        "type": "string",
        "trim": true
    },
    "lastName": {
        "type": "string",
        "trim": true
    },
    "email": {
        "type": "string",
        "trim": true
    },
    "hashedPassword": {
        "type": "string",
        "trim": true
    },
    "mobileNumber": {
        "type": "string",
        "trim": true
    },
    "clientId": {
        "type": "string",
        "ref": "Client"
    },
    "clientCode": {
        "type": "string",
        "trim": true
    },
    "branchId": {
        "type": "string",
        "trim": true,
        "ref": "Branch"
    },
    "branchCode": {
        "type": "string",
        "trim": true
    },
    "code": {
        "type": "string",
        "trim": true
    }
})