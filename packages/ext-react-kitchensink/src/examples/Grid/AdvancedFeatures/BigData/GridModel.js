export default Ext.define('BigDataGridModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'employeeNo'
        }, {
            name: 'rating'
        }, {
            name: 'averageRating',
            calculate: function (data) {
                var average,
                    i,
                    ratings = data.rating || [],
                    count = ratings.length;
                for (i = 0, average = 0; i < count; i++) {
                    average += data.rating[i];
                }
                return average / ratings.length;
            }
        }, {
            name: 'salary',
            type: 'number'
        }, {
            name: 'forename'
        }, {
            name: 'surname'
        }, {
            name: 'fullName',
            calculate: ({forename, surname}) => forename || surname ? `${forename} ${surname}` : ''
        }, {
            name: 'email'
        }, {
            name: 'department'
        }, {
            name: 'dob',
            type: 'date',
            dateFormat: 'Ymd'
        }, {
            name: 'joinDate',
            type: 'date',
            dateFormat: 'Ymd'
        }, {
            name: 'noticePeriod'
        }, {
            name: 'sickDays',
            type: 'integer'
        }, {
            name: 'holidayDays',
            type: 'integer'
        }, {
            name: 'holidayAllowance',
            type: 'integer'
        }, {
            name: 'avatar'
        }, {
            name: 'ratingLastYear',
            type: 'integer'
        }, {
            name: 'ratingmeYear',
            type: 'integer'
        }
    ],
    idField: 'employeeNo'
})