const mongoose = require('mongoose');

export class DomainModelEngine {
    constructor() {
    }

    private connectRefs(schema: any) {
        // nested check for refs in schema
        if (typeof schema === 'object') {
            const keys = Object.keys(schema);
            if (keys.includes('ref')) {
                return {
                    ...schema,
                    type: mongoose.Schema.Types.ObjectId.schemaName,
                }
            } else {
                keys.forEach(key => {
                    schema[key] = this.connectRefs(schema[key]);
                });
            }
        }
        return schema;
    }

    convertToMongooseSchema(schemaName: string, schema: any) {
        schema = this.connectRefs(schema);
        return schema;
    }
}
