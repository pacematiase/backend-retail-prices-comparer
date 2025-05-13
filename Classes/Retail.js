export default class Retail {
    retailId;
    retailName;

    constructor(retailId, retailName) {

        // TODO Autonumber retailId
        if (!retailId || typeof(retailId) !== 'number' || retailId < 0 || retailId !== Math.trunc(retailId)) {
            throw new Error('retailId must be a positive integer')
        }

        this.retailId = retailId;

        if (!retailName || typeof(retailName) !== 'string') {
            throw new Error('retailId must be a non-empty string')
        }
        this.retailName = retailName;
    }

    // TODO Getter for the attibutes
    // TODO Delete a retail
    // TODO update a retail
}