/**
* @NApiVersion 2.x
* @NScriptType UserEventScript
*/
define(['N/record', 'N/search', 'N/error'], function (record, search, error) {

    function beforeSubmit(context) {
        if (context.type !== context.UserEventType.CREATE && context.type !== context.UserEventType.EDIT) {
            return;
        }

        var salesOrder = context.newRecord;
        var customerId = salesOrder.getValue('entity');
        var orderTotal = parseFloat(salesOrder.getValue('total')) || 0;

        if (!customerId) {
            return;
        }

        // Get Customer Credit Limit
        var customerRecord = record.load({
            type: record.Type.CUSTOMER,
            id: customerId
        });

        var creditLimit = parseFloat(customerRecord.getValue('creditlimit')) || 0;
        var creditBalance = parseFloat(customerRecord.getValue('balance')) || 0;

        // Get Open Orders Total
        var openOrdersTotal = 0;

        var salesOrderSearch = search.create({
            type: search.Type.SALES_ORDER,
            filters: [
                ['entity', 'anyof', customerId],
                'AND', ['mainline', 'is', 'T'], // Only header-level records
                'AND', ['status', 'noneof', 'SalesOrd-FullyBilled', 'SalesOrd-Closed'] // Exclude completed orders
            ],
            columns: ['total']
        });

        var searchResult = salesOrderSearch.run().getRange({ start: 0, end: 1000 });

        searchResult.forEach(function (result) {
            openOrdersTotal += parseFloat(result.getValue('total')) || 0;
        });

        // Calculate Available Credit
        var totalOutstanding = openOrdersTotal + orderTotal;

        if (totalOutstanding > creditLimit) {
            throw error.create({
                name: 'EXCEEDED_CREDIT_LIMIT',
                message: 'Your total outstanding orders exceed your credit limit. Please reduce the order amount or contact support.',
                notifyOff: false
            });
        }
    }

    return {
        beforeSubmit: beforeSubmit
    };
});
