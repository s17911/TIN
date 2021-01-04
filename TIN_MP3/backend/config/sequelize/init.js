const sequelize = require('./sequelize');

const Employee = require('../../model/sequelize/Employee');
const Department = require('../../model/sequelize/Department');
const Employment = require('../../model/sequelize/Employment');
const authUtil = require('../../util/authUtils');
const passHash = authUtil.hashPassword('12345');



//const db = require("../../model");

module.exports = () => {
    Employee.hasMany(Employment, {as: 'employments', foreignKey: {name: 'emp_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Employment.belongsTo(Employee, {as: 'employee', foreignKey: {name: 'emp_id', allowNull: false} } );
    Department.hasMany(Employment, {as: 'employments', foreignKey: {name: 'dept_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Employment.belongsTo(Department, {as: 'department', foreignKey: {name: 'dept_id', allowNull: false} });


   // up:() => db.sequelize.query(initialSqlScript)





    let allEmps, allDepts;
    return sequelize
        .sync({force: false}) // jak wlacze true to wymusza drop table i inicjalizuje od 0
        .then( () => {
            return Employee.findAll();
        })
        .then(emps => {
            if( !emps || emps.length == 0 ) {
                return Employee.bulkCreate([
                    {firstName: 'Jan', lastName: 'Janowicz', email: 'jan.Janowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Adam', lastName: 'Adamowicz', email: 'adam.Adamowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Marian', lastName: 'Kaminski', email: 'marian.Kaminski@rozekWHC.com', password: passHash},
                    {firstName: 'Kamil', lastName: 'Kamilowicz', email: 'Kamil.Kamilowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Maciek', lastName: 'Maciekowicz', email: 'Maciekowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Konrad', lastName: 'Konradowicz', email: 'Konradowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Eustachy', lastName: 'Eustachowicz', email: 'Eustachowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Henryk', lastName: 'Henrykowicz', email: 'Henrykowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Witold', lastName: 'Widoldowicz', email: 'Widoldowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Przemek', lastName: 'Przemkowicz', email: 'Przemkowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Zygmunt', lastName: 'Zygmuntowicz', email: 'Zygmuntowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Maurycy', lastName: 'Maurycowicz', email: 'Maurycowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Kacper', lastName: 'Kacperowicz', email: 'Kacperowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Vivadi', lastName: 'Vivadowicz', email: 'Vivadowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Dima', lastName: 'Dimowicz', email: 'Dimowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Karol', lastName: 'Karolowicz', email: 'Karolowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Marian', lastName: 'Marianowicz', email: 'Marianowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Tomek', lastName: 'Tomkowicz', email: 'Tomkowicz@rozekWHC.com', password: passHash},
                    {firstName: 'Robert', lastName: 'Robertowicz', email: 'Robertowicz@rozekWHC.com', password: passHash}

                ])
                .then( () => {
                    return Employee.findAll();
                });
            } else {
                return emps;
            }
        })
        .then( emps => {
            allEmps = emps;
            return Department.findAll();
        })
        .then( depts => {
            if( !depts || depts.length == 0 ) {
                return Department.bulkCreate([
                    { name: 'Zasoby Ludzkie', budget: 500_000 },
                    { name: 'Sprzedaż', budget: 2_000_000 },
                    { name: 'Transport', budget: 5_000_000 },
                    { name: 'Obsługa Klienta', budget: 500_000 },
                    { name: 'Księgowość', budget: 350_000 },
                    { name: 'Ochrona', budget: 600_000 }
                ])
                .then( () => {
                    return Employee.findAll();
                });
            } else {
                return depts;
            }
        })
        .then( depts => {
            allDepts = depts;
            return Employment.findAll();
        })
        .then( empls => {
            if( !empls || empls.length == 0 ) {
                return Employment.bulkCreate([
                    {emp_id: allEmps[0]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[1]._id, dept_id: allDepts[0]._id, salary: 4000, dateFrom: '2001-02-01', dateTo: '2009-02-01'},
                    {emp_id: allEmps[0]._id, dept_id: allDepts[1]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[6]._id, dept_id: allDepts[2]._id, salary: 4000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[2]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[3]._id, dept_id: allDepts[3]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[4]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[2]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[7]._id, dept_id: allDepts[3]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[8]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[9]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[10]._id, dept_id: allDepts[3]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[11]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[12]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[13]._id, dept_id: allDepts[3]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[15]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[15]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[16]._id, dept_id: allDepts[3]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[17]._id, dept_id: allDepts[0]._id, salary: 5000, dateFrom: '2001-01-01', dateTo: '2009-01-01'},
                    {emp_id: allEmps[1]._id, dept_id: allDepts[1]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[2]._id, dept_id: allDepts[1]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[3]._id, dept_id: allDepts[2]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[4]._id, dept_id: allDepts[2]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[5]._id, dept_id: allDepts[3]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[6]._id, dept_id: allDepts[4]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null},
                    {emp_id: allEmps[7]._id, dept_id: allDepts[5]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null}
                ]);
            } else {
                return empls;
            }
        });
};