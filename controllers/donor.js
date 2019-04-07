const pool = require('../config/pool');

const donorController = {
    findOne(req, res) {
        console.log(`Fetching donor with id: ${req.params.id}`);

        const donorId = req.params.id;
        const queryString = 'SELECT * FROM donors WHERE id = ?';

        pool.getConnection((err, connection) => {
            if (err) {
                console.log(`Failed to connect: ${err}`);
                res.sendStatus(500);

                return;
            }

            pool.query(queryString, [donorId], (error, results) => {
                connection.release();

                if (error) {
                    console.log(`Failed to query for donors: ${error}`);
                    res.sendStatus(500);

                    return;
                }

                console.log(`Fetched donor with id: ${req.params.id}`);

                // const donors = rows.map(row => ({
                //     firstName: row.first_name,
                //     lastName: row.last_name,
                // }));

                const donor = results[0];

                res.json(donor);
            });
        });
    },
};

module.exports = donorController;
